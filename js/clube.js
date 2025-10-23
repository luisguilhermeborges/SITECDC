// js/clube.js

function inicializarClube() {
  console.log("[clube.js] Inicializando listeners da página do Clube...");

  // Seleciona todos os botões que têm o atributo 'data-asaas-link'
  const botoesAssinatura = document.querySelectorAll("button[data-asaas-link]");

  // Adiciona um 'escutador' de clique para cada botão
  botoesAssinatura.forEach(botao => {
    botao.addEventListener("click", () => {
      // Pega o link de pagamento guardado no atributo do botão
      const linkPagamento = botao.dataset.asaasLink;
      
      if (linkPagamento) {
        console.log(`[clube.js] Redirecionando para: ${linkPagamento}`);
        // Abre o link de pagamento em uma nova aba do navegador
        window.open(linkPagamento, "_blank", "noopener,noreferrer");
      } else {
        console.warn("[clube.js] Botão clicado, mas não foi encontrado data-asaas-link.");
      }
    });
  });
}

// Expõe a função globalmente para o app.js poder chamá-la
window.inicializarClube = inicializarClube;