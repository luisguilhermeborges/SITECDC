<?php
// site-cdc/public/enviar-pedido.php

// Apenas aceita requisições POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['erro' => 'Método não permitido']);
    exit;
}

// Recebe os dados do JSON enviado pelo Javascript
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['erro' => 'Dados inválidos']);
    exit;
}

// --- CONFIGURAÇÕES ---
$email_loja = "contato@codigodacarne.com.br"; // E-mail que recebe o aviso de venda
$email_noreply = "noreply@codigodacarne.com.br"; // E-mail que envia
$nome_empresa = "Código da Carne";

// --- DADOS DO FORMULÁRIO ---
$nome_cliente = $input['nome'] ?? 'Cliente';
$email_cliente = $input['email'] ?? '';
$resumo_texto = $input['resumo'] ?? 'Sem detalhes';

// --- 1. E-MAIL PARA A LOJA (Aviso de novo pedido) ---
$assunto_loja = "Novo Orçamento de Evento - " . $nome_cliente;
$corpo_loja = "Você recebeu um novo pedido de orçamento pelo site:\n\n" . $resumo_texto;
$headers_loja = "From: $email_noreply" . "\r\n" .
                "Reply-To: $email_cliente" . "\r\n" .
                "X-Mailer: PHP/" . phpversion();

mail($email_loja, $assunto_loja, $corpo_loja, $headers_loja);

// --- 2. E-MAIL DE CONFIRMAÇÃO PARA O CLIENTE (O Noreply) ---
if (!empty($email_cliente)) {
    $assunto_cliente = "Recebemos seu pedido! - Código da Carne";
    
    // Modelo HTML bonito para o cliente
    $corpo_cliente = "
    <html>
    <head>
      <title>Confirmação de Pedido</title>
    </head>
    <body style='font-family: Arial, sans-serif; color: #333;'>
      <div style='max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px;'>
        <h2 style='color: #640404;'>Olá, $nome_cliente!</h2>
        <p>Recebemos sua solicitação de orçamento para o evento. Fique tranquilo, nossa equipe já está analisando e entrará em contato em breve para confirmar os detalhes.</p>
        
        <hr style='border: 0; border-top: 1px solid #eee; margin: 20px 0;'>
        
        <h3 style='color: #640404;'>Resumo do seu pedido:</h3>
        <pre style='background: #f9f9f9; padding: 15px; border-radius: 5px; font-family: inherit; white-space: pre-wrap;'>$resumo_texto</pre>
        
        <hr style='border: 0; border-top: 1px solid #eee; margin: 20px 0;'>
        
        <p><small>Este é um e-mail automático, por favor não responda diretamente a este endereço.</small></p>
        <p>Atenciosamente,<br><strong>Equipe Código da Carne</strong></p>
      </div>
    </body>
    </html>
    ";

    // Headers específicos para HTML
    $headers_cliente  = "MIME-Version: 1.0" . "\r\n";
    $headers_cliente .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $headers_cliente .= "From: $nome_empresa <$email_noreply>" . "\r\n";

    mail($email_cliente, $assunto_cliente, $corpo_cliente, $headers_cliente);
}

// Retorna sucesso para o Javascript
echo json_encode(['sucesso' => true]);
?>