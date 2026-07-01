/* ── Nav scroll state ─────────────────────────────────────────────────────── */
const nav = document.querySelector('.nav');
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', onScroll, { passive: true });

/* ── Scroll reveal ────────────────────────────────────────────────────────── */
// Add js-loaded to enable reveal transitions (content visible by default = no flash)
document.documentElement.classList.add('js-loaded');

// Tag all major sections for reveal
const revealTargets = [
  '.project-photo-wrap',
  '.project-content',
  '.homes-header',
  '.home-card',
  '.lifestyle-photo-col',
  '.lifestyle-content',
  '.builder-text',
  '.builder-photo-wrap',
  '.register-left',
  '.register-right',
];
revealTargets.forEach((sel, si) => {
  document.querySelectorAll(sel).forEach((el, i) => {
    el.classList.add('reveal');
    if (i > 0) el.classList.add(`reveal-delay-${Math.min(i, 4)}`);
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
  { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

/* ── Homes rail — drag to scroll ─────────────────────────────────────────── */
const rail = document.querySelector('.homes-rail');
if (rail) {
  let isDown = false, startX, scrollLeft;
  rail.addEventListener('mousedown', (e) => {
    isDown = true;
    rail.style.cursor = 'grabbing';
    startX = e.pageX - rail.offsetLeft;
    scrollLeft = rail.scrollLeft;
  });
  rail.addEventListener('mouseleave', () => { isDown = false; rail.style.cursor = ''; });
  rail.addEventListener('mouseup',    () => { isDown = false; rail.style.cursor = ''; });
  rail.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - rail.offsetLeft;
    rail.scrollLeft = scrollLeft - (x - startX) * 1.5;
  });
}

/* ── Form basic validation ────────────────────────────────────────────────── */
const form = document.getElementById('registration-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach((input) => {
      const err = input.closest('.field').querySelector('.field-error');
      if (!input.value.trim()) {
        valid = false;
        if (!err) {
          const msg = document.createElement('span');
          msg.className = 'field-error';
          msg.setAttribute('role', 'alert');
          msg.style.cssText = 'font-size:11px;color:oklch(0.55 0.18 25);margin-top:4px;display:block;';
          msg.textContent = 'This field is required.';
          input.insertAdjacentElement('afterend', msg);
        }
        input.setAttribute('aria-invalid', 'true');
      } else {
        if (err) err.remove();
        input.removeAttribute('aria-invalid');
      }
    });
    if (valid) {
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Submitting…';
      btn.disabled = true;
      // In production: replace with real API call
      setTimeout(() => {
        btn.textContent = 'Thank you — we'll be in touch soon.';
        btn.style.background = 'oklch(0.45 0.12 145)';
      }, 1200);
    }
  });
  // Inline validation on blur
  form.querySelectorAll('[required]').forEach((input) => {
    input.addEventListener('blur', () => {
      const err = input.closest('.field').querySelector('.field-error');
      if (!input.value.trim()) {
        if (!err) {
          const msg = document.createElement('span');
          msg.className = 'field-error';
          msg.setAttribute('role', 'alert');
          msg.style.cssText = 'font-size:11px;color:oklch(0.55 0.18 25);margin-top:4px;display:block;';
          msg.textContent = 'This field is required.';
          input.insertAdjacentElement('afterend', msg);
        }
        input.setAttribute('aria-invalid', 'true');
      } else {
        if (err) err.remove();
        input.removeAttribute('aria-invalid');
      }
    });
  });
}

/* ── Smooth anchor links ──────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH = nav ? nav.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - navH - 16;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
