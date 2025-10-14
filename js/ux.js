(() => {
  // ===== BOTÃO VOLTAR AO TOPO =====
  const backTop = document.querySelector('.back-to-top');
  const onScroll = () => {
    if (!backTop) return;
    const y = window.scrollY || document.documentElement.scrollTop;
    backTop.classList.toggle('is-visible', y > 320);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ===== HORÁRIOS DAS LOJAS =====
  // Paranaguá: Seg-Sex 09:00-18:30 / Sáb 09:00-13:00
  // Alphaville & Santa Rosa: Seg-Sex 10:00-19:00 / Sáb 09:00-18:00 / Dom-Feriado 09:00-13:00
  const SCHEDULES = {
    paranagua: {
      today: (d) => {
        const wd = d.getDay();
        if (wd >= 1 && wd <= 5) return [{ start: '09:00', end: '18:30' }];
        if (wd === 6) return [{ start: '09:00', end: '13:00' }];
        return [];
      }
    },
    alphaville: {
      today: (d) => {
        const wd = d.getDay();
        if (wd >= 1 && wd <= 5) return [{ start: '10:00', end: '19:00' }];
        if (wd === 6) return [{ start: '09:00', end: '18:00' }];
        return [{ start: '09:00', end: '13:00' }];
      }
    },
    santarosa: {
      today: (d) => {
        const wd = d.getDay();
        if (wd >= 1 && wd <= 5) return [{ start: '10:00', end: '19:00' }];
        if (wd === 6) return [{ start: '09:00', end: '18:00' }];
        return [{ start: '09:00', end: '13:00' }];
      }
    }
  };

  const parseHM = (hm) => { const [h, m] = hm.split(':').map(Number); return { h, m }; };
  const minutesSinceMidnight = (date) => date.getHours() * 60 + date.getMinutes();
  const isOpenNow = (blocks, date) => {
    const nowMin = minutesSinceMidnight(date);
    return blocks.some(({ start, end }) => {
      const s = parseHM(start); const e = parseHM(end);
      const sMin = s.h * 60 + s.m;
      const eMin = e.h * 60 + e.m;
      return nowMin >= sMin && nowMin <= eMin;
    });
  };
  const formatTodayLabel = (blocks) => {
    if (!blocks || !blocks.length) return 'FECHADO HOJE';
    const parts = blocks.map(({ start, end }) => `${start} – ${end}`);
    return 'HOJE: ' + parts.join('  |  ');
  };

  function updateStoreStatus(root) {
    const id = root?.dataset?.store;
    if (!id || !SCHEDULES[id]) return;
    const now = new Date();
    const blocks = SCHEDULES[id].today(now);
    const open = isOpenNow(blocks, now);
    const badge = root.querySelector('.js-badge');
    const today = root.querySelector('.js-hours-today');
    if (badge) {
      badge.textContent = open ? 'ABERTO AGORA' : 'FECHADO';
      badge.classList.remove('badge--open', 'badge--closed');
      badge.classList.add(open ? 'badge--open' : 'badge--closed');
    }
    if (today) today.textContent = formatTodayLabel(blocks);
  }

  function bootStatuses() {
    document.querySelectorAll('[data-store]').forEach(updateStoreStatus);
  }
  if (document.readyState !== 'loading') bootStatuses();
  else document.addEventListener('DOMContentLoaded', bootStatuses);

  const mo = new MutationObserver(bootStatuses);
  mo.observe(document.documentElement, { childList: true, subtree: true });
})();
