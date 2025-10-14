(() => {
  // ============================
  // LOJAS (COORDENADAS FIXAS)
  // ============================
  // Fonte de referência:
  // - Rua Paranaguá (Centro): aprox. -23.3157075, -51.1692274
  // - Alphaville (Rod. Mábio G. Palhano): aprox. -23.35344, -51.18550
  // - Rua Caracas (Santa Rosa): aprox. -23.3324029, -51.1775149
  //
  // Ajuste à vontade se quiser um posicionamento ainda mais preciso.

  const LOJAS_FIXAS = [
    {
      nome: 'Código da Carne — Loja 1 (Centro)',
      endereco: 'R. Paranaguá, 1306 - Centro, Londrina - PR, 86020-031',
      lat: -23.3157075,
      lon: -51.1692274
    },
    {
      nome: 'Código da Carne — Loja 2 (Alphaville)',
      endereco: 'Rod. Mábio Gonçalves Palhano, 1377 - Alphaville, Londrina - PR, 86055-585',
      lat: -23.35344,
      lon: -51.18550
    },
    {
      nome: 'Código da Carne — Loja 3 (Santa Rosa)',
      endereco: 'R. Caracas, 77 - Santa Rosa, Londrina - PR, 86050-070',
      lat: -23.3324029,
      lon: -51.1775149
    }
  ];

  function gmapsLink(endereco) {
    return 'https://www.google.com/maps?q=' + encodeURIComponent(endereco);
  }

  function mountMiniMap() {
    const el = document.getElementById('cdc-mini-map');
    if (!el || el.dataset.mapInited === '1' || !window.L) return;
    el.dataset.mapInited = '1';

    // Cria o mapa "mini"
    const map = L.map(el, {
      zoomControl: false,       // clean para miniatura
      scrollWheelZoom: false,   // evita zoom acidental
      dragging: true,
      tap: true
    });

    // Camada base (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    // Adiciona marcadores
    const bounds = [];
    LOJAS_FIXAS.forEach((loja) => {
      const { lat, lon } = loja;
      if (typeof lat !== 'number' || typeof lon !== 'number') return;

      L.marker([lat, lon]).addTo(map).bindPopup(
        `<strong>${loja.nome}</strong><br>${loja.endereco}<br>` +
        `<a href="${gmapsLink(loja.endereco)}" target="_blank" rel="noopener">Ver rotas</a>`
      );
      bounds.push([lat, lon]);
    });

    // Enquadra todos os pontos; fallback pro centro de Londrina
    if (bounds.length) {
      map.fitBounds(bounds, { padding: [24, 24] });
    } else {
      map.setView([-23.31028, -51.16278], 12);
    }

    // Em páginas SPA, garante que o Leaflet recalcule o tamanho após injetar a home
    setTimeout(() => map.invalidateSize(), 0);
  }

  // Monta no load
  const boot = () => mountMiniMap();
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);

  // Suporte a SPA: inicializa quando a home é injetada
  const obs = new MutationObserver(() => mountMiniMap());
  obs.observe(document.documentElement, { childList: true, subtree: true });

  // Opcional para chamar manualmente se precisar
  window.CDC_MapMount = mountMiniMap;
})();
