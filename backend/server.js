// Carrega as variáveis de ambiente do ficheiro .env
require('dotenv').config(); 

const express = require('express');
const fetch = require('node-fetch'); // node-fetch v2 é compatível com require

const app = express();

// Middleware para permitir que o frontend (rodando em outra porta/domínio) se comunique com o backend
// Ajuste 'http://localhost:8080' se o seu frontend rodar em outro local durante o desenvolvimento
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Em produção, restrinja ao seu domínio frontend!
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Permite POST e OPTIONS (para preflight)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Responde ao preflight request
  }
  next();
});

app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// Validação básica da chave API e URL ao iniciar
const ASAAS_API_KEY = process.env.ASAAS_API_KEY;
const ASAAS_API_URL = process.env.ASAAS_API_URL;

if (!ASAAS_API_KEY || !ASAAS_API_URL) {
  console.error("ERRO FATAL: Variáveis de ambiente ASAAS_API_KEY ou ASAAS_API_URL não definidas no ficheiro .env");
  process.exit(1); // Encerra a aplicação se as chaves não estiverem configuradas
}

console.log(`Usando API Asaas em: ${ASAAS_API_URL}`);

// --- Endpoint para criar a assinatura ---
// VERIFIQUE AQUI: O caminho '/api/criar-assinatura' está correto
app.post('/api/criar-assinatura', async (req, res) => {
  const { planoId, valor, cliente } = req.body;
  const clientIp = req.ip; // Obtém o IP do cliente

  // Validação básica dos dados recebidos
  if (!planoId || !valor || !cliente || !cliente.nome || !cliente.email || !cliente.cpf) {
    console.warn('Recebida requisição com dados incompletos:', req.body);
    return res.status(400).json({ message: 'Dados incompletos. Verifique nome, email, CPF, plano e valor.' });
  }

  // Validação simples de CPF (11 dígitos numéricos)
  const cpfNumerico = cliente.cpf.replace(/\D/g, '');
  if (cpfNumerico.length !== 11) {
     return res.status(400).json({ message: 'CPF inválido. Deve conter 11 dígitos.' });
  }

   // Validação simples de valor (deve ser um número positivo)
   if (typeof valor !== 'number' || valor <= 0) {
       return res.status(400).json({ message: 'Valor do plano inválido.' });
   }

  console.log(`[${new Date().toISOString()}] Recebida requisição para criar assinatura:`, { planoId, valor, email: cliente.email, cpf: cliente.cpf });

  try {
    // --- 1. Criar ou Buscar o Cliente no Asaas ---
    console.log(`Buscando/Criando cliente: ${cliente.email} / ${cpfNumerico}`);
    let customerId;

    // Tenta buscar o cliente pelo CPF primeiro
    const searchResponse = await fetch(`${ASAAS_API_URL}/customers?cpfCnpj=${cpfNumerico}`, {
        method: 'GET',
        headers: { 'access_token': ASAAS_API_KEY }
    });

    if (!searchResponse.ok) {
        throw new Error(`Erro ${searchResponse.status} ao buscar cliente no Asaas.`);
    }

    const searchResult = await searchResponse.json();

    if (searchResult.data && searchResult.data.length > 0) {
        // Cliente encontrado
        customerId = searchResult.data[0].id;
        console.log(`Cliente encontrado com ID: ${customerId}`);
        // Opcional: Atualizar dados do cliente se necessário (PUT /customers/{id})
    } else {
        // Cliente não encontrado, criar novo
        console.log(`Cliente não encontrado. Criando novo cliente...`);
        const customerPayload = {
            name: cliente.nome,
            email: cliente.email,
            cpfCnpj: cpfNumerico,
            mobilePhone: cliente.telefone ? cliente.telefone.replace(/\D/g, '') : undefined, // Envia só números se existir
            // externalReference: `CDC-CLI-${cpfNumerico}`, // ID único do seu sistema (opcional)
            notificationDisabled: false // Receber notificações do Asaas
        };

        const createResponse = await fetch(`${ASAAS_API_URL}/customers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'access_token': ASAAS_API_KEY,
            },
            body: JSON.stringify(customerPayload),
        });

        const createResult = await createResponse.json(); // Lê a resposta mesmo se der erro

        if (!createResponse.ok) {
            console.error('Erro Asaas (Criar Cliente):', createResult);
            const errorMessage = createResult.errors?.[0]?.description || 'Erro ao criar cliente no Asaas.';
            throw new Error(errorMessage);
        }
        customerId = createResult.id;
        console.log(`Novo cliente criado com ID: ${customerId}`);
    }


    // --- 2. Criar a Assinatura (Subscription) ---
    console.log(`Criando assinatura para Cliente ID ${customerId}, Plano ${planoId}, Valor R$${valor}`);
    
    // Calcula a data da primeira cobrança (ex: 1 dia a partir de hoje)
    const nextDueDate = new Date();
    nextDueDate.setDate(nextDueDate.getDate() + 1);
    const formattedDueDate = nextDueDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    const subscriptionPayload = {
        customer: customerId,
        billingType: 'UNDEFINED', // Permite ao cliente escolher (Cartão, Boleto, PIX no checkout)
        nextDueDate: formattedDueDate,
        value: valor,
        cycle: 'MONTHLY', // Ciclo de cobrança Mensal
        description: `Assinatura Clube Código da Carne - Plano ${planoId.charAt(0).toUpperCase() + planoId.slice(1)}`,
        // externalReference: `CDC-SUB-${planoId.toUpperCase()}-${customerId}`, // ID único da assinatura no seu sistema (opcional)
        // split: [], // Se precisar dividir o pagamento com parceiros
        remoteIp: clientIp, // IP do cliente, importante para análise de fraude
    };

    const subscriptionResponse = await fetch(`${ASAAS_API_URL}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'access_token': ASAAS_API_KEY,
      },
      body: JSON.stringify(subscriptionPayload),
    });

    const subscriptionResult = await subscriptionResponse.json(); // Lê a resposta mesmo se der erro

    if (!subscriptionResponse.ok) {
        console.error('Erro Asaas (Criar Assinatura):', subscriptionResult);
        const errorMessage = subscriptionResult.errors?.[0]?.description || 'Erro ao criar assinatura no Asaas.';
        throw new Error(errorMessage);
    }

    const subscriptionId = subscriptionResult.id;
    console.log(`Assinatura criada com ID: ${subscriptionId}`);

    // --- 3. Obter o Link de Pagamento da Assinatura ---
    // A resposta da criação da assinatura com billingType UNDEFINED geralmente contém o link de checkout.
    const paymentLink = subscriptionResult.paymentLink; // Ou pode estar em outro campo, verifique a resposta real

    if (!paymentLink) {
        console.error('Link de pagamento não encontrado na resposta da criação da assinatura:', subscriptionResult);
        // Tentar buscar a primeira fatura pode ser uma alternativa, mas com UNDEFINED, o link da assinatura é mais comum
        throw new Error('Não foi possível obter o link de pagamento da assinatura.');
    }

    console.log(`Link de pagamento gerado: ${paymentLink}`);

    // --- 4. Retornar o Link para o Frontend ---
    res.status(200).json({ paymentLink: paymentLink });

  } catch (error) {
    console.error(`[${new Date().toISOString()}] Erro no endpoint /api/criar-assinatura:`, error);
    // Envia uma mensagem de erro genérica ou a específica do Asaas para o frontend
    res.status(500).json({ message: error.message || 'Ocorreu um erro inesperado no servidor.' });
  }
});

// --- Iniciar o Servidor ---
const PORT = process.env.PORT || 3001; // Usa a porta do .env ou 3001 como padrão
app.listen(PORT, () => {
  console.log(`Backend do Clube Código da Carne a rodar em http://localhost:${PORT}`);
});