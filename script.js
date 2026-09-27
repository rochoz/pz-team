(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.main-nav');
  const mobileMenu = window.matchMedia('(max-width: 600px)');

  if (menuButton && menu) {
    const setMenuOpen = (open) => {
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
      menu.classList.toggle('is-open', open);
    };

    menuButton.addEventListener('click', () => {
      setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setMenuOpen(false);
    });

    document.addEventListener('click', (event) => {
      if (mobileMenu.matches && menuButton.getAttribute('aria-expanded') === 'true' &&
          !menu.contains(event.target) && !menuButton.contains(event.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuButton.focus();
      }
    });

    mobileMenu.addEventListener('change', () => setMenuOpen(false));
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealTargets = document.querySelectorAll(
    '.section-kicker, .section-heading h2, .section-heading p, .intro-layout, .values-strip, .discipline-card, .coach-card, .visual-caption, .visit-layout, .program-card, .schedule-card, .beginner-note, .schedule-cta > div:last-child'
  );

  if (reduceMotion || !('IntersectionObserver' in window)) return;

  document.body.classList.add('js-ready');

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

  revealTargets.forEach((element) => {
    element.classList.add('scroll-reveal');
    const siblingIndex = Array.prototype.indexOf.call(element.parentElement.children, element);
    element.style.setProperty('--reveal-delay', `${Math.min(siblingIndex, 3) * 80}ms`);
    observer.observe(element);
  });
})();
