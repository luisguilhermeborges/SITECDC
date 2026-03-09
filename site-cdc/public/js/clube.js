// public/js/clube.js

const linksAsaas = {
    'Bronze': 'https://www.asaas.com/c/flhe3ng00j309uye',
    'Prata': 'https://www.asaas.com/c/k97atamydhtlpjxn',
    'Ouro': 'https://www.asaas.com/c/8m6i2m8735235336'
};

const modalCad = document.getElementById('modal-cadastro');
const modalTermos = document.getElementById('modal-termos');
const form = document.getElementById('form-clube-final');

// Abrir Modal de Cadastro
document.querySelectorAll('.btn-assinar').forEach(btn => {
    btn.onclick = () => {
        const plano = btn.dataset.plano;
        document.getElementById('label-plano-modal').innerText = `Plano Selecionado: Box ${plano}`;
        document.getElementById('plano-slug').value = plano;
        modalCad.style.display = 'block';
    }
});

// Fechar Modais
document.querySelector('.close-modal').onclick = () => modalCad.style.display = 'none';
document.querySelector('.close-termos').onclick = () => modalTermos.style.display = 'none';

// Abrir Termos e carregar texto
document.getElementById('abrir-termos').onclick = async (e) => {
    e.preventDefault();
    modalTermos.style.display = 'block';
    const div = document.getElementById('texto-termos');
    if(div.innerText === "Carregando...") {
        try {
            const resp = await fetch('/js/termos-clube.js');
            const data = await resp.text();
            div.innerText = data.match(/`([\s\S]*?)`/)?.[1] || data;
        } catch { div.innerText = "Erro ao carregar os termos. Entre em contato conosco."; }
    }
}

// Redirecionamento Asaas
form.onsubmit = (e) => {
    e.preventDefault();
    const slug = document.getElementById('plano-slug').value;
    if(linksAsaas[slug]) window.location.href = linksAsaas[slug];
}

// Fechar ao clicar no fundo
window.onclick = (e) => {
    if (e.target == modalCad) modalCad.style.display = 'none';
    if (e.target == modalTermos) modalTermos.style.display = 'none';
}