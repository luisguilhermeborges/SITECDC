// public/js/clube.js
import { TERMOS_CLUBE } from './termos-clube.js';

function inicializarClube() {
    const modal = document.getElementById("modal-cadastro");
    const closeBtn = document.querySelector(".close-modal");
    const form = document.getElementById("form-assinatura");
    const nomePlanoModal = document.getElementById("nome-plano-modal");
    const containerTermos = document.querySelector(".termos-texto");

    // Injeta o texto dos termos
    if (containerTermos) {
        containerTermos.innerText = TERMOS_CLUBE;
    }

    const inputCPF = document.getElementById("cpf");
    const inputWhatsApp = document.getElementById("whatsapp");
    const inputCEP = document.getElementById("cep");
    let linkAsaasAtual = "";

    // Máscaras de Input
    inputCPF?.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
        e.target.value = v;
    });

    inputWhatsApp?.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
        e.target.value = v;
    });

    inputCEP?.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '');
        v = v.replace(/(\d{5})(\d{3})/, "$1-$2");
        e.target.value = v;
    });

    // Abrir Modal
    document.querySelectorAll(".btn-assinar").forEach(botao => {
        botao.addEventListener("click", () => {
            linkAsaasAtual = botao.getAttribute("data-asaas-link");
            nomePlanoModal.textContent = botao.getAttribute("data-plano");
            modal.style.display = "flex";
        });
    });

    // Fechar Modal
    if (closeBtn) closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    // Envio do formulário
    form?.addEventListener("submit", (e) => {
        e.preventDefault();
        window.location.href = linkAsaasAtual;
    });
}

document.addEventListener("DOMContentLoaded", inicializarClube);