// js/app.js

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
const onbeefButton = document.getElementById("onbeef-button");

function setActiveLink(path) {
  document.querySelectorAll(".nav__link").forEach(a => {
    a.classList.toggle("is-active", a.getAttribute("href") === `#${path}`);
  });
}

function afterPartialInjected(path) {
  if ("scrollTo" in window) window.scrollTo({ top: 0, left: 0, behavior: "instant" });

  const initIfNeeded = (initFn, fnName) => {
    requestAnimationFrame(() => {
      if (typeof initFn === "function") {
        console.log(`[app.js] Executando inicializador: ${fnName}...`);
        try {
          initFn();
        } catch (e) {
          console.error(`[app.js] Erro ao executar ${fnName} para ${path}:`, e);
        }
      } else {
        console.warn(`[app.js] Função de inicialização ${fnName} não encontrada para ${path}.`);
      }
    });
  };

  // --- Lógica de inicialização por rota ---
  if (path === "/eventos") {
    initIfNeeded(window.EventosInit, 'EventosInit');
  } else if (path === "/clube") {
    initIfNeeded(window.inicializarClube, 'inicializarClube');
  } else if (path === "/home") { // *** ADICIONADO AQUI ***
      // Chama a função de montagem do carrossel principal,
      // que agora está exposta globalmente pelo carousel.js
      initIfNeeded(window.CDC_CarouselMount, 'CDC_CarouselMount');
  }
}

async function loadPartial(path) {
  const url = routes[path] || routes["/home"];
  const finalPath = routes[path] ? path : "/home";

  if (main) main.setAttribute("aria-busy", "true");

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Erro ${res.status} ao carregar ${url}`);
    }
    const html = await res.text();

    if (main) main.innerHTML = html;

    setActiveLink(finalPath);

    if (onbeefButton) {
        onbeefButton.classList.toggle("is-hidden", finalPath === "/eventos" || finalPath === "/clube");
    }

    // Chama inicializações DEPOIS de injetar o HTML
    afterPartialInjected(finalPath);

    // Atualização de Título e Meta Descrição
    const metaDescriptionEl = document.querySelector('meta[name="description"]');
    let pageTitle = "Código da Carne - Da seleção ao corte perfeito";
    let pageDescription = "Da seleção ao corte perfeito. Eventos, Clube e Lojas do Código da Carne em Londrina.";

    // ... (resto do switch case para títulos e descrições) ...
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
    if (main) {
        // ... (código de tratamento de erro) ...
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
    document.title = "Erro - Código da Carne";
    const metaDescriptionEl = document.querySelector('meta[name="description"]');
     if (metaDescriptionEl) metaDescriptionEl.setAttribute("content", "Ocorreu um erro ao carregar esta página.");

  } finally {
    if (main) main.setAttribute("aria-busy", "false");
  }
}

function getPathFromHash() {
  const h = location.hash.replace(/^#/, "");
  return h && h.startsWith("/") ? h : "/home";
}

// --- Event Listeners ---
window.addEventListener("hashchange", () => loadPartial(getPathFromHash()));

window.addEventListener("load", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (navToggle && menu) {
    // ... (código do menu toggle) ...
    navToggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.textContent = isOpen ? '✕' : '☰'; // Muda o ícone do botão
    });
    document.addEventListener("click", (e) => {
      if (menu.classList.contains('is-open') && !menu.contains(e.target) && !navToggle.contains(e.target)) {
        menu.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = '☰';
      }
    });
  }

  if (!location.hash) {
    history.replaceState(null, '', '#/home');
  }
  loadPartial(getPathFromHash());
});

document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-link]");
  if (!link) return;

  const href = link.getAttribute("href");

  if (href && href.startsWith("#/")) {
    e.preventDefault();

    if (menu && menu.classList.contains('is-open')) {
        menu.classList.remove("is-open");
        if(navToggle) {
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.textContent = '☰';
        }
    }

    if (location.hash === href) {
      loadPartial(getPathFromHash());
    } else {
      location.hash = href;
    }
  }
});

// --- Funcionalidade para o Carrossel de Lojas (se existir) ---
// Adia a execução para garantir que o DOM esteja pronto
requestAnimationFrame(() => {
    const storesCarousel = document.querySelector('.stores-carousel');
    const prevButton = document.querySelector('.stores-carousel__arrow.is-prev');
    const nextButton = document.querySelector('.stores-carousel__arrow.is-next');

    if (storesCarousel && prevButton && nextButton) {
        // ... (código de clique e visibilidade das setas do carrossel de lojas) ...
        prevButton.addEventListener('click', () => {
            const cardWidth = storesCarousel.querySelector('.card')?.offsetWidth || 300; // Valor fallback
            const gap = 20;
            storesCarousel.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
        });
        nextButton.addEventListener('click', () => {
            const cardWidth = storesCarousel.querySelector('.card')?.offsetWidth || 300; // Valor fallback
            const gap = 20;
            storesCarousel.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
        });
        const updateArrowVisibility = () => {
            // Verifica se os botões ainda existem (caso a página mude)
            if (!document.body.contains(prevButton) || !document.body.contains(nextButton)) {
                 window.removeEventListener('resize', updateArrowVisibility);
                 storesCarousel.removeEventListener('scroll', updateArrowVisibility);
                 return;
            }
             // Aplica display flex em vez de block para compatibilidade com o estilo
            prevButton.style.display = storesCarousel.scrollLeft <= 10 ? 'none' : 'inline-flex';
            nextButton.style.display = storesCarousel.scrollLeft + storesCarousel.clientWidth >= storesCarousel.scrollWidth - 10 ? 'none' : 'inline-flex';
        };
        storesCarousel.addEventListener('scroll', updateArrowVisibility, { passive: true });
        window.addEventListener('resize', updateArrowVisibility);
        setTimeout(updateArrowVisibility, 150); // Atraso ligeiramente maior
    }
});


console.log("[app.js] Script principal carregado e listeners configurados.");