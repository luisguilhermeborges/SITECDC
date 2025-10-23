// js/app.js

const routes = {
  "/home": "partials/home.html",
  "/eventos": "partials/eventos.html",
  "/clube": "partials/clube.html", // Rota existente
  "/lojas": "partials/lojas.html",
  "/quem-somos": "partials/quem-somos.html"
  // Adicione outras rotas aqui se necessário
};

const main = document.getElementById("main-content");
const menu = document.getElementById("menu");
const navToggle = document.getElementById("navToggle");
const onbeefButton = document.getElementById("onbeef-button"); // Referência ao botão

// Marca o link de navegação ativo
function setActiveLink(path) {
  document.querySelectorAll(".nav__link").forEach(a => {
    a.classList.toggle("is-active", a.getAttribute("href") === `#${path}`);
  });
}

/**
 * Função chamada após o carregamento do conteúdo HTML de uma rota (parcial).
 * Responsável por chamar funções de inicialização específicas de cada página.
 */
function afterPartialInjected(path) {
  // Sobe a página para o topo para melhor experiência do usuário
  if ("scrollTo" in window) window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  // Função auxiliar para chamar inicializadores de forma segura
  const initIfNeeded = (initFn, fnName) => {
    // Usa requestAnimationFrame para garantir que o navegador processou o HTML injetado
    requestAnimationFrame(() => {
      if (typeof initFn === "function") {
        console.log(`[app.js] Executando inicializador: ${fnName}...`);
        try {
          initFn(); // Chama a função de inicialização (ex: window.EventosInit, window.inicializarClube)
        } catch (e) {
          console.error(`[app.js] Erro ao executar ${fnName} para ${path}:`, e);
        }
      } else {
        console.warn(`[app.js] Função de inicialização ${fnName} não encontrada para ${path}. Verifique se o script correspondente foi carregado.`);
      }
    });
  };

  // --- Lógica de inicialização por rota ---
  if (path === "/eventos") {
    // Chama a função definida em eventos.js
    initIfNeeded(window.EventosInit, 'EventosInit');
  } else if (path === "/clube") {
    // Chama a função definida em clube.js
    initIfNeeded(window.inicializarClube, 'inicializarClube');
  }
  // Adicione outras inicializações para diferentes rotas aqui (ex: /lojas, /quem-somos)
  // else if (path === "/lojas") {
  //   initIfNeeded(window.inicializarLojas, 'inicializarLojas');
  // }
}

// Carrega o conteúdo HTML da rota especificada
async function loadPartial(path) {
  // Define a URL do arquivo HTML a ser carregado (ou usa /home como padrão)
  const url = routes[path] || routes["/home"];
  const finalPath = routes[path] ? path : "/home"; // Garante que o path correto seja usado

  // Marca a área de conteúdo como "ocupada" para acessibilidade
  if (main) main.setAttribute("aria-busy", "true");

  try {
    // Busca o conteúdo do arquivo HTML (cache desabilitado para garantir a versão mais recente)
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Erro ${res.status} ao carregar ${url}`);
    }
    const html = await res.text();

    // Insere o HTML carregado na área principal da página
    if (main) main.innerHTML = html;

    // Marca o link de navegação correspondente como ativo
    setActiveLink(finalPath);

    // --- MODIFICAÇÃO ABAIXO: Lógica para esconder o botão ---
    if (onbeefButton) {
        if (finalPath === "/eventos" || finalPath === "/clube") {
            onbeefButton.classList.add("is-hidden");
        } else {
            onbeefButton.classList.remove("is-hidden");
        }
    }
    // --- FIM DA MODIFICAÇÃO ---

    // Chama a função para executar scripts de inicialização específicos da página carregada
    afterPartialInjected(finalPath);

    // --- Atualização dinâmica do Título da Página e Meta Descrição (SEO) ---
    const metaDescriptionEl = document.querySelector('meta[name="description"]');
    let pageTitle = "Código da Carne - Da seleção ao corte perfeito";
    let pageDescription = "Da seleção ao corte perfeito. Eventos, Clube e Lojas do Código da Carne em Londrina.";

    switch (finalPath) {
      case "/eventos":
        pageTitle = "Eventos e Churrascos - Código da Carne";
        pageDescription = "Realize o seu evento connosco. Escolha cardápios completos de churrasco, personalize com adicionais e peça um orçamento.";
        break;
      case "/lojas":
        pageTitle = "Nossas Lojas em Londrina - Código da Carne";
        pageDescription = "Encontre a loja Código da Carne mais próxima de si. Veja os endereços e horários das nossas 3 lojas em Londrina.";
        break;
      case "/quem-somos":
        pageTitle = "Quem Somos - Código da Carne";
        pageDescription = "Conheça a história da Código da Carne, fundada em 2015 pelos irmãos Gabriel e Gustavo Galindo.";
        break;
      case "/clube":
        pageTitle = "Clube Código - Código da Carne";
        pageDescription = "Escolha seu plano Bronze, Prata ou Ouro e receba mensalmente uma seleção exclusiva dos melhores cortes.";
        break;
    }
    document.title = pageTitle;
    if (metaDescriptionEl) metaDescriptionEl.setAttribute("content", pageDescription);

  } catch (e) {
    console.error("[app.js] Erro ao carregar parcial:", e);
    // Mostra uma mensagem de erro na página caso o carregamento falhe
    if (main) {
        main.innerHTML = `
          <section class="section error-page">
            <h2>ERRO AO CARREGAR A PÁGINA</h2>
            <p>Não foi possível carregar o conteúdo solicitado. Por favor, tente atualizar a página ou volte mais tarde.</p>
            <p><a class="btn btn-primary" href="#/home">Voltar para Home</a></p>
            <details>
              <summary>Detalhes do erro</summary>
              <pre>${e.message}\n${e.stack || ''}</pre>
            </details>
          </section>`;
    }
    // Define um título genérico em caso de erro
    document.title = "Erro - Código da Carne";
    const metaDescriptionEl = document.querySelector('meta[name="description"]');
     if (metaDescriptionEl) metaDescriptionEl.setAttribute("content", "Ocorreu um erro ao carregar esta página.");

  } finally {
    // Marca a área de conteúdo como "não ocupada"
    if (main) main.setAttribute("aria-busy", "false");
  }
}

// Obtém o caminho da rota atual a partir do hash da URL (ex: #/eventos -> /eventos)
function getPathFromHash() {
  const h = location.hash.replace(/^#/, "");
  // Retorna o caminho se começar com '/', senão retorna '/home' como padrão
  return h && h.startsWith("/") ? h : "/home";
}

// --- Event Listeners ---

// Listener para mudanças no hash da URL (navegação entre páginas)
window.addEventListener("hashchange", () => loadPartial(getPathFromHash()));

// Listener executado quando a página inicial é carregada completamente
window.addEventListener("load", () => {
  // Atualiza o ano no rodapé
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Configura o botão de toggle do menu mobile
  if (navToggle && menu) {
    navToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.textContent = isOpen ? '✕' : '☰'; // Muda o ícone do botão
    });
    // Fecha o menu se clicar fora dele
    document.addEventListener("click", (e) => {
      if (menu.classList.contains('is-open') && !menu.contains(e.target) && !navToggle.contains(e.target)) {
        menu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = '☰';
      }
    });
  }

  // Garante que a URL tenha um hash (redireciona para /home se não tiver)
  if (!location.hash) {
    history.replaceState(null, '', '#/home'); // Usa replaceState para não criar entrada no histórico
  }
  // Carrega a página inicial baseada no hash atual
  loadPartial(getPathFromHash());
});

// Listener para cliques em links internos da SPA (Single Page Application)
document.addEventListener("click", (e) => {
  // Encontra o link clicado (ou um de seus pais) que tenha o atributo 'data-link'
  const link = e.target.closest("a[data-link]");
  if (!link) return; // Se não for um link da SPA, ignora

  const href = link.getAttribute("href");

  // Previne o comportamento padrão do navegador APENAS se for um link interno (começa com #/)
  if (href && href.startsWith("#/")) {
    e.preventDefault(); // Impede o navegador de pular para a âncora

    // Fecha o menu mobile se estiver aberto ao clicar num link
    if (menu && menu.classList.contains('is-open')) {
        menu.classList.remove("is-open");
        if(navToggle) {
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.textContent = '☰';
        }
    }

    // Se o hash atual já for o destino, força o recarregamento da parcial
    // (útil se o usuário clicar no link da página atual)
    if (location.hash === href) {
      loadPartial(getPathFromHash());
    } else {
      // Altera o hash da URL, o que disparará o listener 'hashchange' para carregar a nova página
      location.hash = href;
    }
  }
  // Se o href não começar com '#/', o navegador seguirá o link normalmente (ex: link externo)
});

console.log("[app.js] Script principal carregado e listeners configurados.");