/* -------------------------------------------------------------------
   cyberknight91 portfolio — vanilla JS glue
   - typing effect on the tagline
   - intersection observer for reveal animations
   - active nav link
   ------------------------------------------------------------------- */

(() => {
  'use strict';

  // Current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Typing effect on the tagline -------------------------------
  const typingEl = document.getElementById('typing');
  if (typingEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const phrases = [
      "Rompo cosas el lunes, las detecto el martes, escribo el runbook el miércoles.",
      "Simulación de adversarios emparejada con detection engineering.",
      "Consultor de ciberseguridad — León, España. Sophos Silver Partner.",
      "Cada ataque atómico de mi lab viene con la regla Sigma que lo caza.",
    ];
    const fullText = typingEl.textContent.trim();
    let idx = 0, phrase = 0, pause = 0, deleting = false;

    typingEl.textContent = "";

    const tick = () => {
      const current = phrases[phrase];

      if (pause > 0) { pause--; return setTimeout(tick, 30); }

      if (!deleting && idx < current.length) {
        typingEl.textContent = current.slice(0, ++idx);
        setTimeout(tick, 18 + Math.random() * 35);
      } else if (!deleting && idx === current.length) {
        pause = 120; // linger on full phrase
        deleting = true;
        setTimeout(tick, 30);
      } else if (deleting && idx > 0) {
        typingEl.textContent = current.slice(0, --idx);
        setTimeout(tick, 8);
      } else if (deleting && idx === 0) {
        deleting = false;
        phrase = (phrase + 1) % phrases.length;
        setTimeout(tick, 300);
      }
    };

    // Start only when hero is visible
    const heroObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          tick();
          heroObs.disconnect();
        }
      });
    });
    heroObs.observe(typingEl);
  }

  // --- Reveal animations ------------------------------------------
  const revealEls = document.querySelectorAll('.section, .hero');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { rootMargin: '-50px 0px', threshold: 0.05 });
  revealEls.forEach(el => revealObs.observe(el));

  // --- Active nav link (simple highlight) -------------------------
  const navLinks = document.querySelectorAll('.topbar__nav a');
  const sections = [...document.querySelectorAll('section[id]')];

  const onScroll = () => {
    const scrollY = window.scrollY + 120;
    let currentId = '';
    for (const s of sections) {
      if (s.offsetTop <= scrollY) currentId = s.id;
    }
    navLinks.forEach(a => {
      const isActive = a.getAttribute('href') === `#${currentId}`;
      a.style.color = isActive ? 'var(--accent)' : '';
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // --- Konami — fun egg that any dev/hacker reviewer will notice -----
  const seq = [38,38,40,40,37,39,37,39,66,65];  // ↑↑↓↓←→←→BA
  let i = 0;
  window.addEventListener('keydown', (e) => {
    i = (e.keyCode === seq[i]) ? i + 1 : 0;
    if (i === seq.length) {
      i = 0;
      document.documentElement.style.setProperty('--accent',   '#00ff9d');
      document.documentElement.style.setProperty('--accent-2', '#00ffea');
      document.documentElement.style.setProperty('--accent-3', '#00ff66');
      console.log('%c[cyberknight91] matrix mode engaged.', 'color:#00ff9d;font-weight:700;');
    }
  });

  // Friendly hello in the console
  if (typeof console !== 'undefined') {
    const style = 'background:linear-gradient(135deg,#b8336a,#7b2fbe);color:white;padding:6px 12px;font-weight:700;border-radius:4px;';
    console.log('%ccyberknight91', style,
      '\n\nPurple team · Simulación de adversarios + detection engineering.\n' +
      'github.com/cyberknight91  ·  ateneaciberseguridad.com\n\n' +
      'Prueba ↑↑↓↓←→←→BA para una pequeña recompensa.');
  }
})();
