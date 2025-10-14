const WPP_NUMBER = "55439918028"; // Número de WhatsApp para receber o orçamento
const SALES_EMAIL = "contato@codigodacarne.com.br"; // E-mail para receber o orçamento
const MENU_IMG_PATH = "assets/cardapios/";

/* ====== MENUS ====== */
const MENUS = [
  {
    id: "BRONZE",
    nome: "🥉 CARDÁPIO BRONZE",
    preco_por_pessoa: 119.90,
    imgBase: "cardapio-bronze",
    inclui: {
      "Entradas": ["Pão com linguiça", "Matambrito", "Batata frita"],
      "Cortes Especiais": ["Short Rib", "Maminha", "Bife Ancho ou Bife Chorizo"],
      "Acompanhamentos": ["Arroz branco", "Salada de folhas com tomate", "Mandioca cozida com bacon"],
      "Sobremesa": ["Abacaxi na brasa"]
    }
  },
  {
    id: "PRATA",
    nome: "🥈 CARDÁPIO PRATA",
    preco_por_pessoa: 159.90,
    imgBase: "cardapio-prata",
    inclui: {
      "Entradas": ["Hambúrguer", "Mandioca frita", "Baguete com pulled pork e sour cream"],
      "Cortes Especiais": ["Linguiça", "Bife Ancho", "Bife Ancho com black rub", "Fraldinha", "Short rib"],
      "Acompanhamentos": ["Arroz caldoso de costela", "Salada de tomate", "Farofa", "Legumes grelhados no palito"],
      "Sobremesa": ["Banoffee rústica com doce de leite", "Opcional: sorvete"]
    }
  },
  {
    id: "OURO",
    nome: "🥇 CARDÁPIO OURO",
    preco_por_pessoa: 189.90,
    imgBase: "cardapio-ouro",
    inclui: {
      "Entradas": ["Hambúrguer", "Panceta com goiabada", "Abacaxi tropical (raspas de limão e sal)", "Croquete de cupim"],
      "Cortes Especiais": ["Bife Ancho", "Bife Ancho com black rub", "Picanha", "T-bone de cordeiro", "Linguiça"],
      "Acompanhamentos": ["Arroz biro biro", "Salada Ceasar (Alface, cubo de frango grelhado e parmesão)", "Mandioca Cremosa"],
      "Sobremesa": ["Panqueca de doce de leite gratinada com sorvete"]
    }
  },
  {
    id: "HAMBURGADA",
    nome: "🍔 HAMBURGADA",
    preco_por_pessoa: 90.00,
    imgBase: "cardapio-hamburgada",
    inclui: {
      "Entradas": ["Batata frita", "Mandioca frita"],
      "Hambúrgueres": [
        "PCQ - Pão, hamburguer bovino e queijo cheddar",
        "BACON - Pão, hamburguer bovino, queijo cheddar e bacon",
        "PORQUÍSSIMO - Pão, hamburguer suíno, queijo e geleia de abacaxi"
      ],
      "Molhos": ["Molhos diversos"]
    }
  }
];

/* ====== ADICIONAIS ====== */
const ADICIONAIS = [
  { canon: "hamburguer", label: "Hambúrguer", categoria: "Entradas", tipo: "per_person", valor: 15.00, img: "hamburguer.jpg" },
  { canon: "mandioca_frita", label: "Mandioca frita", categoria: "Entradas", tipo: "per_person", valor: 8.00, img: "mandioca-frita.jpg" },
  { canon: "croquete_cupim", label: "Croquete de cupim", categoria: "Entradas", tipo: "per_person", valor: 8.00, img: "croquete-cupim.jpeg" },
  { canon: "queijo_coalho_mel", label: "Queijo coalho com mel", categoria: "Entradas", tipo: "per_person", valor: 15.00, img: "queijo-coalho.jpg" },
  { canon: "matambrito", label: "Matambrito de porco", categoria: "Entradas", tipo: "per_person", valor: 15.00, img: "matambrito.jpg" },
  { canon: "batata_frita", label: "Batata frita", categoria: "Entradas", tipo: "per_person", valor: 8.00, img: "batata-frita.jpg" },

  { canon: "bife_ancho_black_rub", label: "Bife Ancho com Black Rub", categoria: "Cortes Especiais", tipo: "per_person", valor: 35.00, img: "ancho-black-hub.jpeg" },
  { canon: "picanha_la_majestad", label: "Picanha", categoria: "Cortes Especiais", tipo: "per_person", valor: 45.00, img: "picanha-la-majestad.jpg" },
  { canon: "french_rack_cordeiro", label: "T-bone de cordeiro", categoria: "Cortes Especiais", tipo: "per_person", valor: 55.00, img: "french-rack.JPG" },
  { canon: "corte_wagyu", label: "Corte Wagyu", categoria: "Cortes Especiais", tipo: "per_person", valor: 75.00, img: "wagyu.jpeg" },

  { canon: "arroz_biro_biro", label: "Arroz biro biro", categoria: "Acompanhamentos", tipo: "per_person", valor: 15.00, img: "arroz-birobiro.jpeg" },
  { canon: "arroz_caldoso_costela", label: "Arroz caldoso de costela", categoria: "Acompanhamentos", tipo: "per_person", valor: 15.00, img: "arroz-caldoso.jpg" },
  { canon: "salada_caesar", label: "Salada Caesar", categoria: "Acompanhamentos", tipo: "per_person", valor: 10.00, img: "salada-caesar.jpg" },
  { canon: "mandioca_cremosa", label: "Mandioca cremosa", categoria: "Acompanhamentos", tipo: "per_person", valor: 8.00, img: "mandioca-cremosa.jpg" },
  { canon: "legumes_grelhados", label: "Legumes grelhados", categoria: "Acompanhamentos", tipo: "per_person", valor: 8.00, img: "legumes-grelhados.JPG" },

  { canon: "panqueca_doce_leite", label: "Panqueca de doce de leite", categoria: "Sobremesa", tipo: "per_person", valor: 9.00, img: "panqueca-doce-de-leite.jpg" },
  { canon: "sorvete", label: "Sorvete", categoria: "Sobremesa", tipo: "per_person", valor: 5.00, img: "sorvete.jpg" },
  { canon: "abacaxi_grelhado", label: "Abacaxi na brasa", categoria: "Sobremesa", tipo: "per_person", valor: 5.00, img: "abacaxi.jpg" }
];

const formatBRL = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const encodeURL = (s) => encodeURIComponent(s).replace(/%0A/g, "%0A");
const norm = (s) => (s || "").toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

let menuGridEl;
let colEntradas, colCortes, colAcomp, colSobrem, adicionaisWrapperEl, bebidasBoxEl;
let checkPedidoEspecial, pedidoEspecialBox, pedidoEspecialText;
let inputPessoas, selectLocal;
let resumoMenuEl, resumoItensEl, resumoBebidasEl, resumoPedidoEl, resumoTotalEl, avisoMinimoEl;
let formFinaliza, evtDataEl, evtHoraEl, evtLocalEl, evtExternoBoxEl, evtEnderecoEl, evtResponsavelEl;
let termsBoxEl, termsAcceptEl, errTermsEl, btnWpp, btnEmail;
let btnNextSidebar, btnPrevSidebar;
let currentStep = 1;
let selectedMenuId = "HAMBURGADA";

// ==================================================================================
// ATUALIZAÇÃO PRINCIPAL ABAIXO
// ==================================================================================
function buildMenuImageHTML(imgBase, altText) {
  const jpgSrc = `${MENU_IMG_PATH}${imgBase}.jpg`;
  
  // Esta versão simplificada carrega o .jpg diretamente e remove a busca por .webp.
  // Isso resolve o problema de o servidor local não encontrar os arquivos .webp.
  return `
    <img class="menu-thumb"
         src="${jpgSrc}"
         alt="${altText}"
         loading="lazy"
         onerror="this.onerror=null; this.src='assets/cardapios/placeholder.png';" />
  `;
}
// ==================================================================================

function renderMenuCardsOnlyImages() {
  if (!menuGridEl) return;
  menuGridEl.innerHTML = "";
  MENUS.forEach((menu) => {
    const inputId = `menu-${menu.id}`;
    const card = document.createElement("div");
    card.className = `menu-card img-only ${menu.id === selectedMenuId ? "active" : ""}`;
    card.innerHTML = `
      <input type="radio" id="${inputId}" class="menu-radio" name="menu" value="${menu.id}" ${menu.id === selectedMenuId ? "checked" : ""} aria-label="${menu.nome}" />
      <label class="card-figure" for="${inputId}" tabindex="0">
        <div class="img-wrap">
          ${buildMenuImageHTML(menu.imgBase, menu.nome)}
        </div>
        <div class="overlay" aria-hidden="true"></div>
      </label>
    `;
    const selectThis = () => {
      const radio = card.querySelector(".menu-radio");
      if (!radio) return;
      radio.checked = true;
      selectedMenuId = radio.value;
      document.querySelectorAll(".menu-card").forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      renderAdicionaisFiltered();
      updateResumo();
      renderMenuItensSidebar();
    };
    card.addEventListener("click", selectThis);
    card.addEventListener("keypress", (e) => { if (e.key === "Enter" || e.key === " ") selectThis(); });
    menuGridEl.appendChild(card);
  });
}

function makeAdicionalItem(ad) {
  const el = document.createElement("div");
  el.className = "adicional-item";
  const imgHTML = ad.img ? `<img class="adicional-thumb" src="assets/adicionais/${ad.img}" alt="${ad.label}" loading="lazy">` : "";
  el.innerHTML = `
    <div class="thumb-wrap">${imgHTML}</div>
    <label class="checkbox">
      <input type="checkbox" data-adicional="${ad.canon}" />
      <span>${ad.label}</span>
    </label>
    <span class="price">${formatBRL(ad.valor)}</span>
  `;
  return el;
}

function getIncludedSetForSelectedMenu() {
  const menu = MENUS.find(m => m.id === selectedMenuId);
  const set = new Set();
  if (!menu?.inclui) return set;
  Object.values(menu.inclui).forEach(arr => (arr || []).forEach(item => set.add(norm(item))));
  return set;
}

function renderAdicionaisFiltered() {
  if (!colEntradas || !colCortes || !colAcomp || !colSobrem) return;
  [colEntradas, colCortes, colAcomp, colSobrem].forEach((c) => c.innerHTML = "");
  const included = getIncludedSetForSelectedMenu();

  ADICIONAIS.forEach((ad) => {
    if (included.has(norm(ad.label))) return;
    const el = makeAdicionalItem(ad);
    switch (ad.categoria) {
      case "Entradas": colEntradas.appendChild(el); break;
      case "Cortes Especiais": colCortes.appendChild(el); break;
      case "Acompanhamentos": colAcomp.appendChild(el); break;
      case "Sobremesa": colSobrem.appendChild(el); break;
      default: colAcomp.appendChild(el);
    }
  });

  if (!colEntradas.children.length) colEntradas.parentElement.hidden = true; else colEntradas.parentElement.hidden = false;
  if (!colCortes.children.length) colCortes.parentElement.hidden = true; else colCortes.parentElement.hidden = false;
  if (!colAcomp.children.length) colAcomp.parentElement.hidden = true; else colAcomp.parentElement.hidden = false;
  if (!colSobrem.children.length) colSobrem.parentElement.hidden = true; else colSobrem.parentElement.hidden = false;
}

const MINIMO_INTERNO = 20;
const MINIMO_EXTERNO = 15;

function getSelectedAdicionais() {
  return Array.from(document.querySelectorAll('[data-adicional]:checked'))
    .map((el) => ADICIONAIS.find((a) => a.canon === el.getAttribute("data-adicional")))
    .filter(Boolean);
}

function getSelectedBebidas() {
  const labels = {
    combo_cerveja_refri_agua: "Cerveja, refrigerante e água",
    combo_chopp_refri_agua: "Chopp, refrigerante e água",
    vinho: "Vinho",
    destilados: "Whisky, conhaque ou outro destilado"
  };
  return Array.from(document.querySelectorAll('[data-bebida]:checked'))
    .map((el) => labels[el.getAttribute("data-bebida")]);
}

function getPessoasAplicandoMinimo(menu, pessoas, local) {
  const minBase = (local === "externo") ? MINIMO_EXTERNO : MINIMO_INTERNO;
  const minimoMenu = menu.minimo_pessoas || minBase;
  return Math.max(pessoas, minimoMenu);
}

function updateResumo() {
  if (!resumoMenuEl) return;
  const menu = MENUS.find((m) => m.id === selectedMenuId) || MENUS[0];
  const pessoasRaw = inputPessoas ? (parseInt(inputPessoas.value, 10) || 0) : 0;
  const local = (selectLocal?.value || "interno");
  const pessoas = getPessoasAplicandoMinimo(menu, pessoasRaw, local);
  const minBase = (local === "externo") ? MINIMO_EXTERNO : MINIMO_INTERNO;
  const minimoMenu = menu.minimo_pessoas || minBase;

  if (pessoasRaw < minimoMenu) {
    if (avisoMinimoEl) avisoMinimoEl.textContent = `Mínimo: ${minimoMenu} pessoas. Calculando com ${minimoMenu}.`;
  } else {
    if (avisoMinimoEl) avisoMinimoEl.textContent = "";
  }

  const adicionaisSel = getSelectedAdicionais();
  const bebidasSel = getSelectedBebidas();
  const totalMenu = menu.preco_por_pessoa * pessoas;
  const totalAdicionais = adicionaisSel.reduce((acc, ad) => acc + (ad.valor * pessoas), 0);
  const total = totalMenu + totalAdicionais;

  resumoMenuEl.textContent = `${menu.nome} — ${formatBRL(menu.preco_por_pessoa)}/pessoa × ${pessoas} = ${formatBRL(totalMenu)}`;
  resumoItensEl.innerHTML = adicionaisSel.length ? `<ul class="ul-clean">${adicionaisSel.map(ad => `<li>${ad.label} — ${formatBRL(ad.valor)}/p</li>`).join("")}</ul>` : "—";
  resumoBebidasEl.innerHTML = bebidasSel.length ? `<ul class="ul-clean">${bebidasSel.map(b => `<li>${b}</li>`).join("")}</ul>` : "—";
  const pedidoTxt = (checkPedidoEspecial?.checked && pedidoEspecialText?.value.trim()) ? pedidoEspecialText.value.trim() : "—";
  resumoPedidoEl.textContent = pedidoTxt;
  resumoTotalEl.textContent = formatBRL(total);
}

function clearErrors() {
  document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
  document.querySelectorAll(".field-error").forEach(el => el.textContent = "");
}

function setError(el, errEl, msg) {
  el?.classList.add("is-invalid");
  if(errEl) errEl.textContent = msg || "Campo obrigatório";
}

function buildResumoTextoParaEnvio() {
  const menu = MENUS.find(m => m.id === selectedMenuId) || MENUS[0];
  const pessoasRaw = inputPessoas ? (parseInt(inputPessoas.value, 10) || 0) : 0;
  const local = (selectLocal?.value || "interno");
  const pessoas = getPessoasAplicandoMinimo(menu, pessoasRaw, local);
  const adicionaisSel = getSelectedAdicionais();
  const bebidasSel = getSelectedBebidas();
  const totalMenu = menu.preco_por_pessoa * pessoas;
  const totalAdicionais = adicionaisSel.reduce((acc, ad) => acc + (ad.valor * pessoas), 0);
  const total = totalMenu + totalAdicionais;
  const pedidoTxt = (checkPedidoEspecial?.checked && pedidoEspecialText?.value.trim()) ? pedidoEspecialText.value.trim() : "Sem pedido especial";

  const linhasDados = [`- Data: ${evtDataEl?.value || "—"} às ${evtHoraEl?.value || "—"}`, `- Local: ${local === "interno" ? "Interno (Espaço Código da Carne)" : "Externo"}`];
  if ((evtLocalEl?.value || local) === "externo") {
    linhasDados.push(`- Endereço: ${evtEnderecoEl?.value || "—"}`);
    linhasDados.push(`- Responsável: ${evtResponsavelEl?.value || "—"}`);
  }

  return [`Olá! Gostaria de um orçamento para evento:`, ``, `*Cardápio:* ${menu.nome}`, `*Pessoas:* ${pessoas}`, `*Local:* ${local === "interno" ? "Interno" : "Externo"}`, ``, `*Adicionais:* ${adicionaisSel.length ? adicionaisSel.map(a => a.label).join(", ") : "Nenhum"}`, `*Bebidas:* ${bebidasSel.length ? bebidasSel.join(", ") : "Nenhuma"}`, `*Pedido especial:* ${pedidoTxt}`, ``, `*Total estimado:* ${formatBRL(total)}`, ``, `*Dados do Evento:*`, ...linhasDados, ``, `*Contato:*`, `- Nome: ${document.getElementById("cli-nome")?.value || "—"}`, `- WhatsApp: ${document.getElementById("cli-whats")?.value || "—"}`, `- E-mail: ${document.getElementById("cli-email")?.value || "—"}`, ``, `Obrigado!`].join("\n");
}

function validarPasso3() {
  clearErrors();
  let ok = true;
  if (!evtDataEl?.value) { setError(evtDataEl, document.getElementById("err-evt-data"), "Informe a data"); ok = false; }
  if (!evtHoraEl?.value) { setError(evtHoraEl, document.getElementById("err-evt-hora"), "Informe a hora"); ok = false; }
  const cliNomeEl = document.getElementById("cli-nome"), cliWhatsEl = document.getElementById("cli-whats"), lgpdOkEl = document.getElementById("lgpd-ok");
  if (!cliNomeEl?.value?.trim()) { setError(cliNomeEl, document.getElementById("err-cli-nome"), "Seu nome é obrigatório"); ok = false; }
  if (!cliWhatsEl?.value?.trim()) { setError(cliWhatsEl, null, ""); ok = false; }
  if (!lgpdOkEl?.checked) { setError(null, document.getElementById("err-lgpd"), "Autorização necessária"); ok = false; }
  if ((evtLocalEl?.value || selectLocal?.value) === "externo") {
    if (!evtEnderecoEl?.value?.trim()) { setError(evtEnderecoEl, document.getElementById("err-evt-endereco"), "Endereço obrigatório"); ok = false; }
    if (!evtResponsavelEl?.value?.trim()) { setError(evtResponsavelEl, document.getElementById("err-evt-responsavel"), "Responsável obrigatório"); ok = false; }
  }
  return ok;
}

function validarTermos() {
  if (!termsAcceptEl?.checked) {
    setError(null, errTermsEl, "É necessário aceitar os termos para finalizar.");
    return false;
  }
  return true;
}

function enviarWhatsApp() { if (validarTermos()) window.open(`https://wa.me/${WPP_NUMBER}?text=` + encodeURL(buildResumoTextoParaEnvio()), "_blank"); }
function enviarEmail() { if (validarTermos()) window.location.href = `mailto:${SALES_EMAIL}?subject=${encodeURL("Orçamento de Evento • Código da Carne")}&body=${encodeURL(buildResumoTextoParaEnvio())}`; }

function renderMenuItensSidebar() {
  const wrap = document.getElementById("menu-itens-card"), titleEl = document.getElementById("menu-itens-title"), content = document.getElementById("menu-itens-content");
  if (!wrap || !content || !titleEl) return;
  const menu = MENUS.find(m => m.id === selectedMenuId);
  if (!menu) { wrap.hidden = true; return; }
  wrap.hidden = currentStep < 2;
  titleEl.textContent = `${menu.nome}`;
  content.innerHTML = Object.keys(menu.inclui).map(cat => `<div class="menu-cat">${cat}</div><ul>${(menu.inclui[cat] || []).map(i => `<li>${i}</li>`).join("")}</ul>`).join("");
}

function loadTerms() {
  if (!termsBoxEl) return;
  termsBoxEl.innerHTML = `<div class="terms-loading">Carregando termos…</div>`;
  fetch("partials/termos-evento.html", { cache: "no-store" }).then(r => r.text()).then(html => {
    const tmp = document.createElement("div"); tmp.innerHTML = html;
    termsBoxEl.innerHTML = tmp.querySelector("body")?.innerHTML || html;
    const scrollEl = termsBoxEl.querySelector("#termsScroll") || termsBoxEl;
    if (termsAcceptEl) { termsAcceptEl.checked = false; termsAcceptEl.disabled = true; }
    errTermsEl && (errTermsEl.textContent = "");
    const onScroll = () => {
      if (Math.ceil(scrollEl.scrollTop + scrollEl.clientHeight) >= scrollEl.scrollHeight) {
        termsAcceptEl && (termsAcceptEl.disabled = false);
        scrollEl.removeEventListener("scroll", onScroll);
      }
    };
    scrollEl.addEventListener("scroll", onScroll);
  }).catch(() => termsBoxEl.innerHTML = `<div class="terms-loading">Erro ao carregar os termos.</div>`);
}

function goToStep(n) {
  currentStep = n;
  document.querySelectorAll('.step').forEach(s => s.hidden = true);
  const current = document.getElementById(`step-${n}`);
  if(current) current.hidden = false;
  
  const sidebarNext = document.getElementById("sidebar-next"), btnBack = document.getElementById("btn-prev-sidebar"), btnNext = document.getElementById("btn-next-sidebar");
  if (sidebarNext) sidebarNext.hidden = n === 4;
  if (btnBack) btnBack.hidden = n === 1;
  if (btnNext) btnNext.textContent = ["Ir para Adicionais", "Ir para Dados do Evento", "Ir para os Termos"][n - 1] || "Próximo";

  if (n === 4) loadTerms();
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderMenuItensSidebar();
}

function wireEvents() {
  checkPedidoEspecial?.addEventListener("change", (e) => { if(pedidoEspecialBox) pedidoEspecialBox.hidden = !e.target.checked; updateResumo(); });
  pedidoEspecialText?.addEventListener("input", updateResumo);
  inputPessoas?.addEventListener("input", updateResumo);
  selectLocal?.addEventListener("change", updateResumo);
  adicionaisWrapperEl?.addEventListener("change", (e) => e.target.matches('[data-adicional]') && updateResumo());
  bebidasBoxEl?.addEventListener("change", (e) => e.target.matches('[data-bebida]') && updateResumo());
  evtLocalEl?.addEventListener("change", (e) => { if(evtExternoBoxEl) evtExternoBoxEl.hidden = e.target.value !== "externo"; });
  btnWpp?.addEventListener("click", enviarWhatsApp);
  btnEmail?.addEventListener("click", enviarEmail);
  termsAcceptEl?.addEventListener("change", () => {
    const en = termsAcceptEl.checked;
    if (btnWpp) btnWpp.disabled = !en;
    if (btnEmail) btnEmail.disabled = !en;
    if (en && errTermsEl) errTermsEl.textContent = "";
  });
  btnNextSidebar?.addEventListener("click", () => currentStep < 3 ? goToStep(currentStep + 1) : (validarPasso3() && goToStep(4)));
  btnPrevSidebar?.addEventListener("click", () => goToStep(currentStep - 1));
}

function EventosInit() {
  menuGridEl = document.getElementById("menuGrid");
  colEntradas = document.getElementById("adicionais-entradas");
  colCortes = document.getElementById("adicionais-cortes");
  colAcomp = document.getElementById("adicionais-acomp");
  colSobrem = document.getElementById("adicionais-sobremesa");
  adicionaisWrapperEl = document.getElementById("adicionaisWrapper");
  bebidasBoxEl = document.getElementById("bebidasBox");
  checkPedidoEspecial = document.getElementById("check-pedido-especial");
  pedidoEspecialBox = document.getElementById("pedido-especial-box");
  pedidoEspecialText = document.getElementById("pedido-especial-text");
  inputPessoas = document.getElementById("input-pessoas");
  selectLocal = document.getElementById("select-local");
  resumoMenuEl = document.getElementById("resumo-menu");
  resumoItensEl = document.getElementById("resumo-itens");
  resumoBebidasEl = document.getElementById("resumo-bebidas");
  resumoPedidoEl = document.getElementById("resumo-pedido");
  resumoTotalEl = document.getElementById("resumo-total");
  avisoMinimoEl = document.getElementById("aviso-minimo");
  formFinaliza = document.getElementById("finaliza-form");
  evtDataEl = document.getElementById("evt-data");
  evtHoraEl = document.getElementById("evt-hora");
  evtLocalEl = document.getElementById("evt-local");
  evtExternoBoxEl = document.getElementById("evt-externo-box");
  evtEnderecoEl = document.getElementById("evt-endereco");
  evtResponsavelEl = document.getElementById("evt-responsavel");
  termsBoxEl = document.getElementById("terms-box");
  termsAcceptEl = document.getElementById("terms-accept");
  errTermsEl = document.getElementById("err-terms");
  btnWpp = document.getElementById("btn-finalizar-wpp");
  btnEmail = document.getElementById("btn-finalizar-email");
  btnNextSidebar = document.getElementById("btn-next-sidebar");
  btnPrevSidebar = document.getElementById("btn-prev-sidebar");

  renderMenuCardsOnlyImages();
  renderAdicionaisFiltered();
  wireEvents();
  goToStep(1);
  updateResumo();
}

window.EventosInit = EventosInit;