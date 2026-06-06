// =============================================
// COLOMBIA 5.0 – main.js
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── Active nav link ──
  const links = document.querySelectorAll('.nav-links a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ── Hamburger menu ──
  const btn = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (btn && navLinks) {
    btn.addEventListener('click', () => {
      btn.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  // ── Bilingual tabs ──
  document.querySelectorAll('.bilingual-wrap').forEach(wrap => {
    wrap.querySelectorAll('.lang-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const lang = tab.dataset.lang;
        wrap.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
        wrap.querySelectorAll('.lang-content').forEach(c => c.classList.add('hidden'));
        tab.classList.add('active');
        const target = wrap.querySelector(`.lang-content[data-lang="${lang}"]`);
        if (target) target.classList.remove('hidden');
      });
    });
  });

  // ── Glossary search ──
  const searchInput = document.getElementById('glossary-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      const rows = document.querySelectorAll('.glossary-table tbody tr');
      let visible = 0;
      rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        const show = text.includes(q);
        row.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      const counter = document.getElementById('glossary-count');
      if (counter) counter.textContent = `${visible} term${visible !== 1 ? 's' : ''} found`;
    });
  }

  // ── Scroll reveal ──
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.conf-card, .about-card, .ethics-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });

});
