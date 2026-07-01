/* ── Nav scroll state ─────────────────────────────────────────────────────── */
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}

/* ── Mobile hamburger ─────────────────────────────────────────────────────── */
const hamburger = document.querySelector('.nav-hamburger');
if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Scroll reveal ────────────────────────────────────────────────────────── */
document.documentElement.classList.add('js-loaded');

const revealSelectors = [
  '.stat-item',
  '.story-heading', '.story-body', '.story-perks', '.story-photo-col',
  '.homes-intro',
  '.hs-img-wrap', '.hs-text',
  '.location-left', '.location-right',
  '.builder-text', '.builder-img-col',
  '.cta-content',
];

revealSelectors.forEach((sel) => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    if (i > 0 && i <= 4) el.classList.add(`reveal-delay-${i}`);
  });
});

const revealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

/* ── Smooth anchor scroll ─────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = nav ? nav.offsetHeight : 0;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - navH - 8,
      behavior: 'smooth',
    });
  });
});
