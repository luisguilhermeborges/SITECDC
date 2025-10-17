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

  const initIfNeeded = (initFn) => {
    requestAnimationFrame(() => {
      if (typeof initFn === "function") {
        initFn();
      } else {
        requestAnimationFrame(() => {
          if (typeof initFn === "function") initFn();
        });
      }
    });
  };

  // Lógica de inicialização para a página de eventos (RESTAURADA)
  if (path === "/eventos") {
    initIfNeeded(window.EventosInit);
  }
}

async function loadPartial(path) {
  const url = routes[path] || routes["/home"];
  main.setAttribute("aria-busy", "true");
  try {
    const res = await fetch(url, { cache: "no-store" });
    const html = await res.text();

    main.innerHTML = html;
    setActiveLink(path);
    afterPartialInjected(path);

  } catch (e) {
    console.error("Erro ao carregar parcial:", e);
    main.innerHTML = `
      <section class="section">
        <h2>ERRO AO CARREGAR A PÁGINA</h2>
        <p>Tente novamente.</p>
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
  const href = a.getAttribute("href");
  if (href && !href.startsWith("#/")) {
    e.preventDefault();
    const target = a.dataset.page || href;
    location.hash = target.startsWith("/") ? `#${target}` : `#/${target}`;
  }
});