// Dentro de frontend/js/app.js

const routes = {
  "/home": "partials/home.html",
  "/eventos": "partials/eventos.html",
  "/clube": "partials/clube.html",
  "/lojas": "partials/lojas.html",
  "/quem-somos": "partials/quem-somos.html"
};

const main = document.getElementById("main-content");
const menu = document.getElementById("menu");
const navToggle = document.getElementById("navToggle");

function setActiveLink(path) {
  document.querySelectorAll(".nav__link").forEach(a => {
    a.classList.toggle("is-active", a.getAttribute("href") === `#${path}`);
  });
}

/**
 * Hook de inicialização por rota.
 * Aqui chamamos a lógica específica logo após injetar a parcial no DOM.
 */
function afterPartialInjected(path) {
  // Sobe a página para o topo (UX)
  if ("scrollTo" in window) window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  const initIfNeeded = (initFn, fnName) => {
    // Tenta executar a função DEPOIS que o navegador processar a injeção do HTML
    requestAnimationFrame(() => {
      if (typeof initFn === "function") {
        console.log(`[app.js] Executando ${fnName}...`);
        try {
            initFn();
        } catch(e) {
            console.error(`[app.js] Erro ao executar ${fnName}:`, e);
        }
      } else {
         console.error(`[app.js] Falha ao encontrar a função de inicialização ${fnName} para ${path}.`);
      }
    });
  };

  // Lógica de inicialização para a página de eventos
  if (path === "/eventos") {
    initIfNeeded(window.EventosInit, 'EventosInit'); 
  }

  // === LÓGICA CORRETA PARA O CLUBE ===
  if (path === "/clube") {
    // Chama a função inicializarClube que foi definida globalmente em clube.html
    initIfNeeded(window.inicializarClube, 'inicializarClube');
  }
   // === FIM DA ALTERAÇÃO ===
}

async function loadPartial(path) {
  const url = routes[path] || routes["/home"];
  main.setAttribute("aria-busy", "true");
  try {
    // O frontend DEVE estar rodando num servidor web para este fetch funcionar
    const res = await fetch(url, { cache: "no-store" }); 
    if (!res.ok) { // Verifica se o fetch foi bem sucedido
        throw new Error(`Erro ${res.status} ao carregar ${url}`);
    }
    const html = await res.text();

    main.innerHTML = html; // INJETAR HTML PRIMEIRO (isso executa o <script> em clube.html)
    setActiveLink(path);
    
    // CHAMA A FUNÇÃO DE INICIALIZAÇÃO DEPOIS DE INJETAR
    afterPartialInjected(path); 

    // Atualiza o título e a meta descrição da página dinamicamente (SEO)
    const metaDescriptionEl = document.querySelector('meta[name="description"]');
    switch (path) {
      case "/eventos":
        document.title = "Eventos e Churrascos - Código da Carne";
        if (metaDescriptionEl) metaDescriptionEl.setAttribute("content", "Realize o seu evento connosco. Escolha cardápios completos de churrasco, personalize com adicionais e peça um orçamento.");
        break;
      case "/lojas":
        document.title = "Nossas Lojas em Londrina - Código da Carne";
        if (metaDescriptionEl) metaDescriptionEl.setAttribute("content", "Encontre a loja Código da Carne mais próxima de si. Veja os endereços e horários das nossas 3 lojas em Londrina.");
        break;
      case "/quem-somos":
        document.title = "Quem Somos - Código da Carne";
        if (metaDescriptionEl) metaDescriptionEl.setAttribute("content", "Conheça a história da Código da Carne, fundada em 2015 pelos irmãos Gabriel e Gustavo Galindo.");
        break;
      case "/clube":
        document.title = "Clube Código - Código da Carne";
        if (metaDescriptionEl) metaDescriptionEl.setAttribute("content", "Escolha seu plano Bronze, Prata ou Ouro e receba mensalmente uma seleção exclusiva dos melhores cortes.");
        break;
      default: // /home
        document.title = "Código da Carne - Da seleção ao corte perfeito";
        if (metaDescriptionEl) metaDescriptionEl.setAttribute("content", "Da seleção ao corte perfeito. Eventos, Clube e Lojas do Código da Carne em Londrina.");
    }

  } catch (e) {
    console.error("Erro ao carregar parcial:", e);
    main.innerHTML = `
      <section class="section">
        <h2>ERRO AO CARREGAR A PÁGINA</h2>
        <p>Tente novamente mais tarde ou contacte o suporte.</p>
        <p><small>${e.message}</small></p>
      </section>`;
  } finally {
    main.setAttribute("aria-busy", "false");
  }
}

function getPathFromHash() {
  const h = location.hash.replace(/^#/, "");
  return h && h.startsWith("/") ? h : "/home";
}

window.addEventListener("hashchange", () => loadPartial(getPathFromHash()));

window.addEventListener("load", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  if (navToggle && menu) {
    navToggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !navToggle.contains(e.target)) {
        menu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (!location.hash) location.hash = "/home";
  loadPartial(getPathFromHash());
});

document.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-link]");
  if (!a) return;
  // Previne o comportamento padrão APENAS se o link for interno (começa com #/)
  const href = a.getAttribute("href");
  if (href && href.startsWith("#/")) {
      e.preventDefault();
      // Não precisa mudar o hash aqui, pois o hashchange listener fará isso.
      // Apenas garante que o link não cause um salto na página antes do JS carregar.
      // Se location.hash já for igual ao href, força o carregamento da parcial
      if (location.hash === href) {
          loadPartial(getPathFromHash());
      } else {
          location.hash = href; // Dispara o hashchange listener
      }
  }
  // Se não começar com #/, deixa o comportamento padrão (ex: link externo)
});