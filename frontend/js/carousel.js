(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function initCarousel(root) {
    if (!root || root.dataset.carouselInited === '1') return; // evita duplo init (SPA)
    root.dataset.carouselInited = '1';

    const track   = root.querySelector('.carousel__track');
    const slides  = Array.from(root.querySelectorAll('.carousel__slide'));
    const dotsEl  = root.querySelector('.carousel__dots');
    const prevBtn = root.querySelector('.carousel__arrow.is-prev');
    const nextBtn = root.querySelector('.carousel__arrow.is-next');
    const autoplayMs = Number(root.dataset.autoplay) || 4500;

    if (!track || slides.length === 0 || !dotsEl) return;

    let index = 0;
    let width = root.clientWidth;
    let isDragging = false;
    let startX = 0, currentX = 0;
    let autoTimer = null;

    // Dots
    dotsEl.innerHTML = '';
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `Ir para slide ${i + 1}`);
      b.addEventListener('click', () => goTo(i, true));
      dotsEl.appendChild(b);
    });
    function updateDots(){
      dotsEl.querySelectorAll('button').forEach((b, i) => {
        b.setAttribute('aria-selected', i === index ? 'true' : 'false');
      });
    }

    function setX(px){ track.style.transform = `translate3d(${px}px,0,0)`; }

    function goTo(i, userAction=false){
      index = (i + slides.length) % slides.length;
      const x = -index * width;
      track.style.transition = userAction ? 'transform .35s ease' : 'transform .45s ease';
      setX(x);
      updateDots();
    }

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    function startAutoplay(){
      if (prefersReduced) return;
      stopAutoplay();
      autoTimer = setInterval(next, autoplayMs);
    }
    function stopAutoplay(){
      if (autoTimer){ clearInterval(autoTimer); autoTimer = null; }
    }

    // Arraste (Pointer Events)
    function onDown(e){
      isDragging = true;
      startX = e.clientX;
      currentX = startX;
      track.style.transition = 'none';
      stopAutoplay();
    }
    function onMove(e){
      if (!isDragging) return;
      currentX = e.clientX;
      const delta = currentX - startX;
      const baseX = -index * width;
      setX(baseX + delta);
    }
    function onUp(){
      if (!isDragging) return;
      isDragging = false;
      const delta = currentX - startX;
      const threshold = width * 0.15;
      if (delta > threshold) prev();
      else if (delta < -threshold) next();
      else goTo(index, true);
      if (!document.hidden) startAutoplay();
    }

    track.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);

    // Setas (desktop)
    if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoplay(); prev(); startAutoplay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoplay(); next(); startAutoplay(); });

    // Resizing/visibilidade
    window.addEventListener('resize', () => { width = root.clientWidth; goTo(index, true); });
    root.addEventListener('mouseenter', stopAutoplay);
    root.addEventListener('mouseleave', () => { if (!document.hidden) startAutoplay(); });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopAutoplay(); else startAutoplay();
    });

    // Teclado (acessibilidade)
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
      if (e.key === 'Home')       { e.preventDefault(); goTo(0, true); }
      if (e.key === 'End')        { e.preventDefault(); goTo(slides.length - 1, true); }
    });

    // Inicializa
    track.style.willChange = 'transform';
    goTo(0, true);
    if (!prefersReduced) startAutoplay();
  }

  // Inicialização padrão
  function mount(){ document.querySelectorAll('[data-carousel]').forEach(initCarousel); }
  if (document.readyState !== 'loading') mount();
  else document.addEventListener('DOMContentLoaded', mount);

  // *** IMPORTANTE PARA SPA: observa o DOM e inicializa quando a home entra ***
  const obs = new MutationObserver((mutations) => {
    for (const m of mutations){
      m.addedNodes && m.addedNodes.forEach(node => {
        if (!(node instanceof HTMLElement)) return;
        if (node.matches?.('[data-carousel]')) initCarousel(node);
        node.querySelectorAll?.('[data-carousel]').forEach(initCarousel);
      });
    }
  });
  obs.observe(document.documentElement, { childList:true, subtree:true });

  // Re-montagem manual, se quiser chamar no app:
  window.CDC_CarouselMount = mount;
})();
