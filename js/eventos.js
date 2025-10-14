const WPP_NUMBER = "55439918028";
const SALES_EMAIL = "contato@codigodacarne.com.br";
const MENU_IMG_PATH = "assets/cardapios/";

const MENUS = [
  { id: "BRONZE", nome: "🥉 Cardápio Bronze", preco_por_pessoa: 119.90, imgBase: "cardapio-bronze", inclui: { "Entradas": ["Pão com linguiça", "Matambrito", "Batata frita"], "Cortes Especiais": ["Short Rib", "Maminha", "Bife Ancho ou Bife Chorizo"], "Acompanhamentos": ["Arroz branco", "Salada de folhas com tomate", "Mandioca cozida com bacon"], "Sobremesa": ["Abacaxi na brasa"] } },
  { id: "PRATA", nome: "🥈 Cardápio Prata", preco_por_pessoa: 159.90, imgBase: "cardapio-prata", inclui: { "Entradas": ["Hambúrguer", "Mandioca frita", "Baguete com pulled pork e sour cream"], "Cortes Especiais": ["Linguiça", "Bife Ancho", "Bife Ancho com black rub", "Fraldinha", "Short rib"], "Acompanhamentos": ["Arroz caldoso de costela", "Salada de tomate", "Farofa", "Legumes grelhados no palito"], "Sobremesa": ["Banoffee rústica com doce de leite", "Opcional: sorvete"] } },
  { id: "OURO", nome: "🥇 Cardápio Ouro", preco_por_pessoa: 189.90, imgBase: "cardapio-ouro", inclui: { "Entradas": ["Hambúrguer", "Panceta com goiabada", "Abacaxi tropical (raspas de limão e sal)", "Croquete de cupim"], "Cortes Especiais": ["Bife Ancho", "Bife Ancho com black rub", "Picanha", "T-bone de cordeiro", "Linguiça"], "Acompanhamentos": ["Arroz biro biro", "Salada Ceasar", "Mandioca Cremosa"], "Sobremesa": ["Panqueca de doce de leite gratinada com sorvete"] } },
  { id: "HAMBURGADA", nome: "🍔 Hamburgada", preco_por_pessoa: 90.00, imgBase: "cardapio-hamburgada", inclui: { "Entradas": ["Batata frita", "Mandioca frita"], "Hambúrgueres": ["PCQ", "BACON", "PORQUÍSSIMO"], "Molhos": ["Molhos diversos"] } }
];

const ADICIONAIS = [
    { canon: "hamburguer", label: "Hambúrguer", categoria: "Entradas", valor: 15.00, img: "hamburguer.jpg" },
    { canon: "mandioca_frita", label: "Mandioca frita", categoria: "Entradas", valor: 8.00, img: "mandioca-frita.jpg" },
    { canon: "croquete_cupim", label: "Croquete de cupim", categoria: "Entradas", valor: 8.00, img: "croquete-cupim.jpeg" },
    { canon: "queijo_coalho_mel", label: "Queijo coalho com mel", categoria: "Entradas", valor: 15.00, img: "queijo-coalho.jpg" },
    { canon: "matambrito", label: "Matambrito de porco", categoria: "Entradas", valor: 15.00, img: "matambrito.jpg" },
    { canon: "batata_frita", label: "Batata frita", categoria: "Entradas", valor: 8.00, img: "batata-frita.jpg" },
    { canon: "bife_ancho_black_rub", label: "Bife Ancho com Black Rub", categoria: "Cortes Especiais", valor: 35.00, img: "ancho-black-hub.jpeg" },
    { canon: "picanha_la_majestad", label: "Picanha", categoria: "Cortes Especiais", valor: 45.00, img: "picanha-la-majestad.jpg" },
    { canon: "french_rack_cordeiro", label: "T-bone de cordeiro", categoria: "Cortes Especiais", valor: 55.00, img: "french-rack.JPG" },
    { canon: "corte_wagyu", label: "Corte Wagyu", categoria: "Cortes Especiais", valor: 75.00, img: "wagyu.jpeg" },
    { canon: "arroz_biro_biro", label: "Arroz biro biro", categoria: "Acompanhamentos", valor: 15.00, img: "arroz-birobiro.jpeg" },
    { canon: "arroz_caldoso_costela", label: "Arroz caldoso de costela", categoria: "Acompanhamentos", valor: 15.00, img: "arroz-caldoso.jpg" },
    { canon: "salada_caesar", label: "Salada Caesar", categoria: "Acompanhamentos", valor: 10.00, img: "salada-caesar.jpg" },
    { canon: "mandioca_cremosa", label: "Mandioca cremosa", categoria: "Acompanhamentos", valor: 8.00, img: "mandioca-cremosa.jpg" },
    { canon: "legumes_grelhados", label: "Legumes grelhados", categoria: "Acompanhamentos", valor: 8.00, img: "legumes-grelhados.JPG" },
    { canon: "panqueca_doce_leite", label: "Panqueca de doce de leite", categoria: "Sobremesa", valor: 9.00, img: "panqueca-doce-de-leite.jpg" },
    { canon: "sorvete", label: "Sorvete", categoria: "Sobremesa", valor: 5.00, img: "sorvete.jpg" },
    { canon: "abacaxi_grelhado", label: "Abacaxi na brasa", categoria: "Sobremesa", valor: 5.00, img: "abacaxi.jpg" }
];

const formatBRL = (n) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const encodeURL = (s) => encodeURIComponent(s).replace(/%0A/g, "%0A");
const norm = (s) => (s || "").toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, " ").trim();

let elems = {};
let currentStep = 1;
let selectedMenuId = "BRONZE";

function buildMenuImageHTML(imgBase, altText, price) {
  const jpgSrc = `${MENU_IMG_PATH}${imgBase}.jpg`;
  return `
    <img class="menu-thumb" src="${jpgSrc}" alt="${altText}" loading="lazy" onerror="this.style.display='none'"/>
    <div class="card-info-overlay">${formatBRL(price)}/pessoa</div>
  `;
}

function renderMenuCardsOnlyImages() {
  elems.menuGrid.innerHTML = "";
  MENUS.forEach((menu) => {
    const card = document.createElement("div");
    card.className = `menu-card img-only ${menu.id === selectedMenuId ? "active" : ""}`;
    card.innerHTML = `
      <input type="radio" id="menu-${menu.id}" class="menu-radio" name="menu" value="${menu.id}" ${menu.id === selectedMenuId ? "checked" : ""}>
      <label class="card-figure" for="menu-${menu.id}" tabindex="0">
        ${buildMenuImageHTML(menu.imgBase, menu.nome, menu.preco_por_pessoa)}
      </label>
    `;
    card.addEventListener("click", () => {
      selectedMenuId = menu.id;
      document.querySelectorAll(".menu-card").forEach(c => c.classList.remove("active"));
      card.classList.add("active");
      renderAdicionaisFiltered();
      updateResumo();
      renderMenuItensSidebar();
    });
    elems.menuGrid.appendChild(card);
  });
}

function makeAdicionalItem(ad) {
  const el = document.createElement("div");
  el.className = "adicional-item";
  el.innerHTML = `
    <div class="thumb-wrap"><img class="adicional-thumb" src="assets/adicionais/${ad.img}" alt="${ad.label}" loading="lazy"></div>
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
  if (menu?.inclui) Object.values(menu.inclui).flat().forEach(item => set.add(norm(item)));
  return set;
}

function renderAdicionaisFiltered() {
    const included = getIncludedSetForSelectedMenu();
    const cols = {
        Entradas: elems.adicionaisEntradas,
        "Cortes Especiais": elems.adicionaisCortes,
        Acompanhamentos: elems.adicionaisAcomp,
        Sobremesa: elems.adicionaisSobremesa
    };
    Object.values(cols).forEach(col => col.innerHTML = "");
    ADICIONAIS.forEach(ad => {
        if (!included.has(norm(ad.label)) && cols[ad.categoria]) {
            cols[ad.categoria].appendChild(makeAdicionalItem(ad));
        }
    });
}

const MINIMO_INTERNO = 20, MINIMO_EXTERNO = 15;

function updateResumo() {
  const menu = MENUS.find(m => m.id === selectedMenuId) || MENUS[0];
  const pessoasRaw = parseInt(elems.inputPessoas.value, 10) || 0;
  const local = elems.selectLocal.value;
  const minimo = local === "externo" ? MINIMO_EXTERNO : MINIMO_INTERNO;
  const pessoas = Math.max(pessoasRaw, minimo);
  elems.avisoMinimo.textContent = pessoasRaw < minimo ? `Mínimo: ${minimo} pessoas. Calculando com ${minimo}.` : "";
  const adicionaisSel = Array.from(document.querySelectorAll('[data-adicional]:checked')).map(el => ADICIONAIS.find(a => a.canon === el.dataset.adicional)).filter(Boolean);
  const bebidasSel = Array.from(document.querySelectorAll('[data-bebida]:checked')).map(el => el.nextElementSibling.textContent.split('—')[0].trim());
  const totalMenu = menu.preco_por_pessoa * pessoas;
  const totalAdicionais = adicionaisSel.reduce((acc, ad) => acc + (ad.valor * pessoas), 0);
  elems.resumoMenu.textContent = `${menu.nome} (${formatBRL(menu.preco_por_pessoa)} × ${pessoas})`;
  elems.resumoItens.innerHTML = adicionaisSel.map(ad => `<li>${ad.label}</li>`).join("") || "—";
  elems.resumoBebidas.innerHTML = bebidasSel.map(b => `<li>${b}</li>`).join("") || "—";
  elems.resumoPedido.textContent = elems.checkPedidoEspecial.checked && elems.pedidoEspecialText.value.trim() ? "Sim" : "—";
  elems.resumoTotal.textContent = formatBRL(totalMenu + totalAdicionais);
}

function buildResumoTextoParaEnvio() {
    const menu = MENUS.find(m => m.id === selectedMenuId) || MENUS[0];
    const pessoas = Math.max(parseInt(elems.inputPessoas.value, 10) || 0, elems.selectLocal.value === "externo" ? MINIMO_EXTERNO : MINIMO_INTERNO);
    const adicionais = Array.from(document.querySelectorAll('[data-adicional]:checked')).map(el => el.nextElementSibling.textContent.trim()).join(", ") || "Nenhum";
    const bebidas = Array.from(document.querySelectorAll('[data-bebida]:checked')).map(el => el.nextElementSibling.textContent.split('—')[0].trim()).join(", ") || "Nenhuma";
    const total = elems.resumoTotal.textContent;
    let localInfo = `- Local: ${elems.selectLocal.options[elems.selectLocal.selectedIndex].text}`;
    if (elems.selectLocal.value === 'externo') {
        localInfo += `\n- Endereço: ${elems.evtEndereco.value || 'Não informado'}\n- Responsável: ${elems.evtResponsavel.value || 'Não informado'}`;
    }
    return [
        `*Orçamento de Evento - Código da Carne*`, `------------------------------------`, `*Cardápio:* ${menu.nome}`,
        `*Nº de Pessoas:* ${pessoas}`, `*Adicionais:* ${adicionais}`, `*Bebidas (sob consulta):* ${bebidas}`,
        `*Pedido Especial:* ${elems.checkPedidoEspecial.checked ? elems.pedidoEspecialText.value.trim() || 'Sim' : 'Não'}`,
        `------------------------------------`, `*Total Estimado:* ${total}`, `------------------------------------`,
        `*Dados do Evento:*`, `- Data: ${elems.evtData.value || 'Não informada'}`, `- Hora: ${elems.evtHora.value || 'Não informada'}`, localInfo,
        `------------------------------------`, `*Dados do Cliente:*`, `- Nome: ${elems.cliNome.value}`, `- WhatsApp: ${elems.cliWhats.value}`,
        `- E-mail: ${elems.cliEmail.value || 'Não informado'}`,
    ].join('\n');
}

function validarPasso(passo) {
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    let ok = true;
    if (passo === 3) {
        if (!elems.cliNome.value.trim()) { elems.cliNome.classList.add('is-invalid'); ok = false; }
        if (!elems.cliWhats.value || elems.cliWhats.value.length < 14) { elems.cliWhats.classList.add('is-invalid'); ok = false; }
        if (!elems.lgpdOk.checked) { elems.lgpdOk.parentElement.classList.add('is-invalid'); ok = false; }
        if (elems.selectLocal.value === 'externo' && !elems.evtEndereco.value.trim()) { elems.evtEndereco.classList.add('is-invalid'); ok = false; }
    }
    if (passo === 4 && !elems.termsAccept.checked) {
        elems.termsAccept.parentElement.classList.add('is-invalid'); ok = false;
    }
    return ok;
}

function goToStep(n) {
  currentStep = n;
  document.querySelectorAll('.step').forEach(s => s.hidden = true);
  document.getElementById(`step-${n}`).hidden = false;
  elems.btnNextSidebar.textContent = ["Ir para Adicionais", "Ir para Dados", "Ir para Termos"][n - 1] || "Próximo";
  elems.sidebarNext.hidden = n === 4;
  elems.btnPrevSidebar.hidden = n === 1;
  if (n === 4) loadTerms();
  window.scrollTo({ top: 0, behavior: "smooth" });
  renderMenuItensSidebar();
}

function renderMenuItensSidebar() {
    const menu = MENUS.find(m => m.id === selectedMenuId);
    elems.menuItensCard.hidden = currentStep < 2 || !menu;
    if (menu) {
        elems.menuItensTitle.textContent = menu.nome;
        elems.menuItensContent.innerHTML = Object.keys(menu.inclui).map(cat => `<div class="menu-cat">${cat}</div><ul>${menu.inclui[cat].map(i => `<li>${i}</li>`).join("")}</ul>`).join("");
    }
}

function loadTerms() {
    fetch("partials/termos-evento.html").then(r => r.text()).then(html => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        elems.termsBox.innerHTML = doc.body.innerHTML;
        const scrollEl = elems.termsBox.querySelector("#termsScroll") || elems.termsBox;
        scrollEl.onscroll = () => {
            if (scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight - 10) {
                elems.termsAccept.disabled = false;
                scrollEl.onscroll = null;
            }
        };
    }).catch(e => elems.termsBox.innerHTML = "Erro ao carregar termos.");
}

function EventosInit() {
    const ids = ["menuGrid", "adicionaisWrapper", "checkPedidoEspecial", "pedidoEspecialBox", "pedidoEspecialText", "inputPessoas", "selectLocal", "resumoMenu", "resumoItens", "resumoBebidas", "resumoPedido", "resumoTotal", "avisoMinimo", "cliNome", "cliWhats", "cliEmail", "lgpdOk", "evtData", "evtHora", "evtEndereco", "evtResponsavel", "termsBox", "termsAccept", "btnFinalizarWpp", "btnFinalizarEmail", "btnNextSidebar", "btnPrevSidebar", "sidebarNext", "menuItensCard", "menuItensTitle", "menuItensContent", "adicionais-entradas", "adicionais-cortes", "adicionais-acomp", "adicionais-sobremesa"];
    ids.forEach(id => {
        const camelId = id.replace(/-(\w)/g, (_, c) => c.toUpperCase());
        elems[camelId] = document.getElementById(id);
    });
    
    renderMenuCardsOnlyImages();
    renderAdicionaisFiltered();
    
    document.body.addEventListener('input', updateResumo);
    document.body.addEventListener('change', updateResumo);

    elems.btnNextSidebar.onclick = () => {
        if (currentStep === 1) { goToStep(2); }
        else if (currentStep === 2) { goToStep(3); }
        else if (currentStep === 3) { if (validarPasso(3)) { goToStep(4); } }
    };
    elems.btnPrevSidebar.onclick = () => {
        if (currentStep > 1) { goToStep(currentStep - 1); }
    };

    elems.btnFinalizarWpp.onclick = () => validarPasso(4) && window.open(`https://wa.me/${WPP_NUMBER}?text=` + encodeURL(buildResumoTextoParaEnvio()), "_blank");
    elems.btnFinalizarEmail.onclick = () => validarPasso(4) && (window.location.href = `mailto:${SALES_EMAIL}?subject=${encodeURL("Orçamento de Evento")}&body=${encodeURL(buildResumoTextoParaEnvio())}`);
    elems.selectLocal.onchange = () => document.getElementById('evt-externo-box').hidden = elems.selectLocal.value !== 'externo';
    elems.checkPedidoEspecial.onchange = () => elems.pedidoEspecialBox.hidden = !elems.checkPedidoEspecial.checked;

    IMask(elems.cliWhats, { mask: '(00) 00000-0000' });
    IMask(elems.evtData, { mask: Date, pattern: 'd/`m/`Y', lazy: false });

    goToStep(1);
    updateResumo();
}

window.EventosInit = EventosInit;