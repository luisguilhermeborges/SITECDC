const WPP_NUMBER = "55439918028"; // Número de WhatsApp para receber o orçamento
const SALES_EMAIL = "contato@codigodacarne.com.br"; // E-mail para receber o orçamento
const MENU_IMG_PATH = "assets/cardapios/";

/* ====== MENUS (ajuste os nomes base das imagens conforme existirem na pasta assets/cardapios) ====== */
const MENUS = [
  {
    id: "BRONZE",
    nome: "🥉 CARDÁPIO BRONZE",
    preco_por_pessoa: 119.90,
    imgBase: "cardapio-bronze", // Procura por .webp e depois .jpg, etc.
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

/* ====== ADICIONAIS (com imagens .webp) ====== */
const ADICIONAIS = [
  { canon: "hamburguer", label: "Hambúrguer", categoria: "Entradas", tipo: "per_person", valor: 15.00, img: "hamburguer.webp" },
  { canon: "mandioca_frita", label: "Mandioca frita", categoria: "Entradas", tipo: "per_person", valor: 8.00, img: "mandioca-frita.webp" },
  { canon: "croquete_cupim", label: "Croquete de cupim", categoria: "Entradas", tipo: "per_person", valor: 8.00, img: "croquete-cupim.webp" },
  { canon: "queijo_coalho_mel", label: "Queijo coalho com mel", categoria: "Entradas", tipo: "per_person", valor: 15.00, img: "queijo-coalho.webp" },
  { canon: "matambrito", label: "Matambrito de porco", categoria: "Entradas", tipo: "per_person", valor: 15.00, img: "matambrito.webp" },
  { canon: "batata_frita", label: "Batata frita", categoria: "Entradas", tipo: "per_person", valor: 8.00, img: "batata-frita.webp" },

  { canon: "bife_ancho_black_rub", label: "Bife Ancho com Black Rub", categoria: "Cortes Especiais", tipo: "per_person", valor: 35.00, img: "ancho-black-hub.webp" },
  { canon: "picanha_la_majestad", label: "Picanha", categoria: "Cortes Especiais", tipo: "per_person", valor: 45.00, img: "picanha-la-majestad.webp" },
  { canon: "french_rack_cordeiro", label: "T-bone de cordeiro", categoria: "Cortes Especiais", tipo: "per_person", valor: 55.00, img: "french-rack.webp" },
  { canon: "corte_wagyu", label: "Corte Wagyu", categoria: "Cortes Especiais", tipo: "per_person", valor: 75.00, img: "wagyu.webp" },

  { canon: "arroz_biro_biro", label: "Arroz biro biro", categoria: "Acompanhamentos", tipo: "per_person", valor: 15.00, img: "arroz-birobiro.webp" },
  { canon: "arroz_caldoso_costela", label: "Arroz caldoso de costela", categoria: "Acompanhamentos", tipo: "per_person", valor: 15.00, img: "arroz-caldoso.webp" },
  { canon: "salada_caesar", label: "Salada Caesar", categoria: "Acompanhamentos", tipo: "per_person", valor: 10.00, img: "salada-caesar.webp" },
  { canon: "mandioca_cremosa", label: "Mandioca cremosa", categoria: "Acompanhamentos", tipo: "per_person", valor: 8.00, img: "mandioca-cremosa.webp" },
  { canon: "legumes_grelhados", label: "Legumes grelhados", categoria: "Acompanhamentos", tipo: "per_person", valor: 8.00, img: "legumes-grelhados.webp" },

  { canon: "panqueca_doce_leite", label: "Panqueca de doce de leite", categoria: "Sobremesa", tipo: "per_person", valor: 9.00, img: "panqueca-doce-de-leite.webp" },
  { canon: "sorvete", label: "Sorvete", categoria: "Sobremesa", tipo: "per_person", valor: 5.00, img: "sorvete.webp" },
  { canon: "abacaxi_grelhado", label: "Abacaxi na brasa", categoria: "Sobremesa", tipo: "per_person", valor: 5.00, img: "abacaxi.webp" }
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

let btnNextSidebar, btnPrevSidebar, sidebarInputsEl;
let currentStep = 1;
let selectedMenuId = "HAMBURGADA";

/* ====== Fallback robusto de imagem ====== */
window.__menuImgFallback = function (img, base) {
  const queue = (img.dataset.exts || "jpg,jpeg,png").split(",");
  const next = queue.shift();
  if (!next) {
    img.onerror = null;
    img.src = MENU_IMG_PATH + "placeholder.png";
    return;
  }
  img.dataset.exts = queue.join(",");
  img.src = `${base}.${next}`;
};

function buildMenuImageHTML(imgBase, altText) {
  const base = `${MENU_IMG_PATH}${imgBase}`;
  return `
    <picture>
      <source srcset="${base}.webp" type="image/webp">
      <img class="menu-thumb"
           src="${base}.jpg"
           data-exts="jpeg,png"
           alt="${altText}"
           loading="lazy"
           onerror="window.__menuImgFallback && window.__menuImgFallback(this, '${base}')" />
    </picture>
  `;
}

/* ====== Render dos cards do Passo 1 ====== */
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

/* ====== Adicionais ====== */
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

  if (!colEntradas.children.length) colEntradas.innerHTML = `<div class="adicional-item"><span class="checkbox"><input type="checkbox" disabled /><span>Sem adicionais</span></span></div>`;
  if (!colCortes.children.length) colCortes.innerHTML = `<div class="adicional-item"><span class="checkbox"><input type="checkbox" disabled /><span>Sem adicionais</span></span></div>`;
  if (!colAcomp.children.length) colAcomp.innerHTML = `<div class="adicional-item"><span class="checkbox"><input type="checkbox" disabled /><span>Sem adicionais</span></span></div>`;
  if (!colSobrem.children.length) colSobrem.innerHTML = `<div class="adicional-item"><span class="checkbox"><input type="checkbox" disabled /><span>Sem adicionais</span></span></div>`;
}

/* ====== Cálculos / Resumo ====== */
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
    if (avisoMinimoEl) avisoMinimoEl.textContent = `Mínimo para este cenário: ${minimoMenu} pessoas. Calculando com ${minimoMenu}.`;
  } else {
    if (avisoMinimoEl) avisoMinimoEl.textContent = "";
  }

  const adicionaisSel = getSelectedAdicionais();
  const bebidasSel = getSelectedBebidas();

  const totalMenu = menu.preco_por_pessoa * pessoas;
  const totalAdicionais = adicionaisSel.reduce((acc, ad) => acc + (ad.valor * pessoas), 0);
  const total = totalMenu + totalAdicionais;

  resumoMenuEl.textContent = `${menu.nome} — ${formatBRL(menu.preco_por_pessoa)}/pessoa × ${pessoas} = ${formatBRL(totalMenu)}`;
  resumoItensEl && (resumoItensEl.innerHTML = adicionaisSel.length ? `<ul class="ul-clean">${adicionaisSel.map(ad => `<li>${ad.label} — ${formatBRL(ad.valor)}/pessoa</li>`).join("")}</ul>` : "—");
  resumoBebidasEl && (resumoBebidasEl.innerHTML = bebidasSel.length ? `<ul class="ul-clean">${bebidasSel.map(b => `<li>${b} — sob consulta</li>`).join("")}</ul>` : "—");

  const pedidoTxt = (checkPedidoEspecial?.checked && pedidoEspecialText?.value.trim())
    ? pedidoEspecialText.value.trim()
    : (checkPedidoEspecial?.checked ? "Solicitado (aguardando descrição)" : "—");

  resumoPedidoEl && (resumoPedidoEl.textContent = pedidoTxt);
  resumoTotalEl && (resumoTotalEl.textContent = formatBRL(total));
}

/* ====== Validações & envio ====== */
function clearErrors() {
  document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
  document.querySelectorAll(".field-error").forEach(el => el.textContent = "");
}
function setError(el, errEl, msg) {
  el && el.classList.add("is-invalid");
  errEl && (errEl.textContent = msg || "Campo obrigatório");
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

  const pedidoTxt = (checkPedidoEspecial?.checked && pedidoEspecialText?.value.trim())
    ? pedidoEspecialText.value.trim()
    : (checkPedidoEspecial?.checked ? "Solicitado (aguardando descrição)" : "Sem pedido especial");

  const linhasDados = [
    `- Data: ${evtDataEl?.value || "—"} às ${evtHoraEl?.value || "—"}`,
    `- Local: ${local === "interno" ? "Interno (Espaço Código da Carne)" : "Externo"}`
  ];
  const localEscolhido = (evtLocalEl?.value || selectLocal?.value || "interno").toLowerCase();
  if (localEscolhido === "externo") {
    linhasDados.push(`- Endereço: ${evtEnderecoEl?.value || "—"}`);
    linhasDados.push(`- Quem libera a entrada: ${evtResponsavelEl?.value || "—"}`);
  }

  const checkNotaFiscal = document.getElementById("check-nota-fiscal");
  const billingIdEl = document.getElementById("billing-id");
  let notaFiscalInfo = "Não";
  if (checkNotaFiscal?.checked) {
    notaFiscalInfo = `Sim (Documento: ${billingIdEl?.value || "Não informado"})`;
  }

  return [
    `Olá! Quero um orçamento de evento:`,
    ``,
    `Cardápio: ${menu.nome}`,
    `Pessoas: ${pessoas}`,
    `Local: ${local === "interno" ? "Interno" : "Externo"}`,
    ``,
    `Adicionais: ${adicionaisSel.length ? adicionaisSel.map(a => `${a.label} (${formatBRL(a.valor)}/pessoa)`).join("; ") : "Nenhum"}`,
    `Bebidas (sob consulta): ${bebidasSel.length ? bebidasSel.join("; ") : "Nenhuma"}`,
    `Pedido especial: ${pedidoTxt}`,
    ``,
    `Totais estimados:`,
    `- Cardápio: ${formatBRL(menu.preco_por_pessoa)} × ${pessoas} = ${formatBRL(totalMenu)}`,
    `- Adicionais: ${formatBRL(totalAdicionais)}`,
    `= Total: ${formatBRL(total)}`,
    ``,
    `Dados do evento:`,
    ...linhasDados,
    ``,
    `Contato:`,
    `- Nome: ${document.getElementById("cli-nome")?.value || "—"}`,
    `- CPF: ${document.getElementById("cli-cpf")?.value || "—"}`,
    `- WhatsApp: ${document.getElementById("cli-whats")?.value || "—"}`,
    `- E-mail: ${document.getElementById("cli-email")?.value || "—"}`,
    ``,
    `Precisa de Nota Fiscal: ${notaFiscalInfo}`,
    ``,
    `Obrigado!`
  ].join("\n");
}

function validarPasso3() {
  clearErrors();
  let ok = true;

  const cliNomeEl = document.getElementById("cli-nome");
  if (!cliNomeEl?.value?.trim()) { setError(cliNomeEl, document.getElementById("err-cli-nome"), "Seu nome"); ok = false; }
  
  const cliCpfEl = document.getElementById("cli-cpf");
  if (!cliCpfEl?.value?.trim() || cliCpfEl.value.replace(/\D/g, '').length !== 11) { setError(cliCpfEl, document.getElementById("err-cli-cpf"), "CPF inválido"); ok = false; }

  const cliWhatsEl = document.getElementById("cli-whats");
  const whatsDigits = (cliWhatsEl?.value || "").replace(/\D/g, '');
  if (whatsDigits.length < 10) { setError(cliWhatsEl, document.getElementById("err-cli-whats"), "WhatsApp inválido"); ok = false; }

  const cliEmailEl = document.getElementById("cli-email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (cliEmailEl?.value && !emailRegex.test(cliEmailEl.value)) { setError(cliEmailEl, document.getElementById("err-cli-email"), "E-mail inválido"); ok = false; }

  if (!evtDataEl?.value) { setError(evtDataEl, document.getElementById("err-evt-data"), "Informe a data"); ok = false; }
  if (!evtHoraEl?.value) { setError(evtHoraEl, document.getElementById("err-evt-hora"), "Informe a hora"); ok = false; }
  
  const lgpdOkEl = document.getElementById("lgpd-ok");
  if (!lgpdOkEl?.checked) { const el = document.getElementById("err-lgpd"); el && (el.textContent = "Autorize o contato para envio do orçamento."); ok = false; }

  const isExterno = (selectLocal?.value || "").toLowerCase() === "externo";
  if (isExterno) {
    if (!evtEnderecoEl?.value?.trim()) { setError(evtEnderecoEl, document.getElementById("err-evt-endereco"), "Informe o endereço"); ok = false; }
    if (!evtResponsavelEl?.value?.trim()) { setError(evtResponsavelEl, document.getElementById("err-evt-responsavel"), "Informe quem libera a entrada"); ok = false; }
  }

  const checkNotaFiscal = document.getElementById("check-nota-fiscal");
  const billingIdEl = document.getElementById("billing-id");
  const billingDigits = (billingIdEl?.value || "").replace(/\D/g, '');
  if (checkNotaFiscal?.checked && (billingDigits.length !== 11 && billingDigits.length !== 14)) {
    setError(billingIdEl, document.getElementById("err-billing-id"), "CPF/CNPJ de faturamento inválido");
    ok = false;
  }

  return ok;
}

function validarTermos() {
  clearErrors();
  if (!termsAcceptEl?.checked) {
    setError(null, errTermsEl, "É necessário aceitar os termos para finalizar.");
    return false;
  }
  return true;
}

function enviarWhatsApp() {
  if (!validarTermos()) return;
  const texto = buildResumoTextoParaEnvio();
  const base = WPP_NUMBER && !/X{3,}/.test(WPP_NUMBER) ? `https://wa.me/${WPP_NUMBER}?text=` : `https://wa.me/?text=`;
  window.open(base + encodeURL(texto), "_blank");
}
function enviarEmail() {
  if (!validarTermos()) return;
  const texto = buildResumoTextoParaEnvio();
  const assunto = encodeURL("Orçamento de Evento • Código da Carne");
  const corpo = encodeURL(texto);
  const dest = SALES_EMAIL || "";
  window.location.href = `mailto:${dest}?subject=${assunto}&body=${corpo}`;
}

/* ====== Sidebar Itens do Cardápio ====== */
function renderMenuItensSidebar() {
  const wrap = document.getElementById("menu-itens-card");
  const titleEl = document.getElementById("menu-itens-title");
  const content = document.getElementById("menu-itens-content");
  if (!wrap || !content) return;

  const menu = MENUS.find(m => m.id === selectedMenuId);
  if (!menu) { wrap.hidden = true; return; }

  wrap.hidden = currentStep < 2; // só mostra a partir do passo 2
  titleEl.textContent = `${menu.nome} — ${formatBRL(menu.preco_por_pessoa)}/pessoa`;

  const parts = [];
  Object.keys(menu.inclui).forEach(cat => {
    const itens = menu.inclui[cat] || [];
    if (!itens.length) return;
    parts.push(`<div class="menu-cat">${cat}</div><ul>${itens.map(i => `<li>${i}</li>`).join("")}</ul>`);
  });
  content.innerHTML = parts.join("");
}

/* ====== Termos ====== */
function loadTerms() {
  if (!termsBoxEl) return;
  termsBoxEl.innerHTML = `<div class="terms-loading">Carregando termos…</div>`;
  fetch("partials/termos-evento.html", { cache: "no-store" })
    .then(r => r.text())
    .then(html => {
      const tmp = document.createElement("html");
      tmp.innerHTML = html;
      const body = tmp.querySelector("body");
      termsBoxEl.innerHTML = body ? body.innerHTML : html;
      const scrollEl = termsBoxEl.querySelector("#termsScroll") || termsBoxEl;
      if (termsAcceptEl) { termsAcceptEl.checked = false; termsAcceptEl.disabled = true; }
      if (errTermsEl) errTermsEl.textContent = "";
      const onScroll = () => {
        const atBottom = Math.ceil(scrollEl.scrollTop + scrollEl.clientHeight) >= scrollEl.scrollHeight;
        if (atBottom) {
          termsAcceptEl && (termsAcceptEl.disabled = false);
          scrollEl.removeEventListener("scroll", onScroll);
        }
      };
      scrollEl.addEventListener("scroll", onScroll);
    })
    .catch(() => {
      termsBoxEl.innerHTML = `<div class="terms-loading">Não foi possível carregar os termos. Tente atualizar a página.</div>`;
    });
}

/* ====== Navegação do Wizard (com IDs corretos) ====== */
function goToStep(n) {
  currentStep = n;
  [1, 2, 3, 4].forEach(i => {
    const sec = document.getElementById(`step-${i}`);
    if (sec) sec.hidden = (i !== n);
  });

  const itensCard = document.getElementById("menu-itens-card");
  const sidebarNext = document.getElementById("sidebar-next");
  const btnNext = document.getElementById("btn-next-sidebar");

  if (sidebarInputsEl) sidebarInputsEl.hidden = (n >= 3);
  if (itensCard) itensCard.hidden = !(n >= 2);
  if (sidebarNext) sidebarNext.hidden = (n === 4);
  
  if (btnPrevSidebar) {
    btnPrevSidebar.hidden = (n === 1);
    // Linha de depuração:
    console.log(`Step ${n}: Setting btnPrevSidebar.hidden to ${btnPrevSidebar.hidden}`);
  }

  if (btnNext) {
    btnNext.textContent =
      (n === 1) ? "Ir para Adicionais" :
      (n === 2) ? "Ir para Dados do Evento" :
      (n === 3) ? "Ir para os Termos" :
      "Próximo";
  }

  if (n === 4) loadTerms();
  if ("scrollTo" in window) window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  renderMenuItensSidebar();
}

function applyMask(el, maskFn) {
  const handler = (e) => {
    const pos = e.target.selectionStart;
    const originalValue = e.target.value;
    const newValue = maskFn(originalValue);
    e.target.value = newValue;
    const newPos = pos + (newValue.length - originalValue.length);
    e.target.setSelectionRange(newPos, newPos);
  };
  el?.addEventListener("input", handler);
}

function wireMasksAndToggles() {
  const dateMask = (v) => v.replace(/\D/g, '').slice(0, 8).replace(/(\d{2})(\d)/, '$1/$2').replace(/(\d{2})(\d)/, '$1/$2');
  applyMask(document.getElementById("evt-data"), dateMask);
  
  const phoneMask = (v) => {
    let r = v.replace(/\D/g, '').slice(0, 11);
    if (r.length > 10) r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
    else if (r.length > 5) r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    else if (r.length > 2) r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
    else r = r.replace(/^(\d*)/, '($1');
    return r;
  };
  applyMask(document.getElementById("cli-whats"), phoneMask);
  
  const cpfMask = (v) => v.replace(/\D/g, '').slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  applyMask(document.getElementById("cli-cpf"), cpfMask);

  const cpfCnpjMask = (v) => {
    let r = v.replace(/\D/g, '');
    if (r.length <= 11) { // CPF
      r = r.replace(/(\d{3})(\d)/, '$1.$2');
      r = r.replace(/(\d{3})(\d)/, '$1.$2');
      r = r.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    } else { // CNPJ
      r = r.slice(0, 14).replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
    return r;
  };
  applyMask(document.getElementById("billing-id"), cpfCnpjMask);

  const checkNotaFiscal = document.getElementById("check-nota-fiscal");
  const billingBox = document.getElementById("billing-details-box");
  checkNotaFiscal?.addEventListener("change", (e) => {
    if (billingBox) billingBox.hidden = !e.target.checked;
  });

  checkPedidoEspecial?.addEventListener("change", (e) => {
    if (pedidoEspecialBox) pedidoEspecialBox.hidden = !e.target.checked;
    updateResumo();
  });
  pedidoEspecialText?.addEventListener("input", updateResumo);
}

function wireCalc() {
  inputPessoas?.addEventListener("input", () => { updateResumo(); renderMenuItensSidebar(); renderAdicionaisFiltered(); });
  selectLocal?.addEventListener("change", () => {
    const isExterno = selectLocal.value === "externo";
    if (evtExternoBoxEl) evtExternoBoxEl.hidden = !isExterno;
    updateResumo();
    renderMenuItensSidebar();
    renderAdicionaisFiltered();
  });

  adicionaisWrapperEl?.addEventListener("change", (e) => {
    if (e.target.matches?.('[data-adicional]')) updateResumo();
  });
  bebidasBoxEl?.addEventListener("change", (e) => {
    if (e.target.matches?.('[data-bebida]')) updateResumo();
  });
}

function wireFinalizacao() {
  btnWpp?.addEventListener("click", enviarWhatsApp);
  btnEmail?.addEventListener("click", enviarEmail);
  termsAcceptEl?.addEventListener("change", () => {
    const enable = termsAcceptEl.checked;
    if (btnWpp) btnWpp.disabled = !enable;
    if (btnEmail) btnEmail.disabled = !enable;
    if (enable && errTermsEl) errTermsEl.textContent = "";
  });
  document.getElementById("finaliza-form")?.addEventListener("submit", (e) => e.preventDefault());
}

function wireWizardNav() {
  btnNextSidebar?.addEventListener("click", () => {
    if (currentStep === 1) goToStep(2);
    else if (currentStep === 2) goToStep(3);
    else if (currentStep === 3) { if (validarPasso3()) goToStep(4); }
  });

  btnPrevSidebar?.addEventListener("click", () => {
    if (currentStep === 2) goToStep(1);
    else if (currentStep === 3) goToStep(2);
    else if (currentStep === 4) goToStep(3);
  });
}

/* ====== INIT ====== */
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
  sidebarInputsEl = document.getElementById("sidebar-inputs");

  renderMenuCardsOnlyImages();
  renderAdicionaisFiltered();
  renderMenuItensSidebar();

  wireMasksAndToggles();
  wireCalc();
  wireWizardNav();
  wireFinalizacao();

  goToStep(1);
  updateResumo();
}

/* Expor a função de inicialização para ser chamada pelo app.js */
window.EventosInit = EventosInit;