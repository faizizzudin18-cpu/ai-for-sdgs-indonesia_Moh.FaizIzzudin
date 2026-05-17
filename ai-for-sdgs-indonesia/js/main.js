// main.js — Navigation, search modal, mobile menu, reading progress
(function () {
  // === STICKY NAV ===
  function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;
    window.addEventListener('scroll', function () {
      const current = window.scrollY;
      if (current > 60) {
        nav.classList.add('shrunk');
      } else {
        nav.classList.remove('shrunk');
      }
      lastScroll = current;
    }, { passive: true });
  }

  // === MOBILE MENU ===
  function initMobileMenu() {
    const openBtn = document.querySelector('.nav__hamburger');
    const closeBtn = document.querySelector('.mobile-menu__close');
    const menu = document.querySelector('.mobile-menu');
    if (!openBtn || !menu) return;

    function openMenu() {
      menu.classList.add('open');
      document.body.style.overflow = 'hidden';
      closeBtn && closeBtn.focus();
    }

    function closeMenu() {
      menu.classList.remove('open');
      document.body.style.overflow = '';
      openBtn.focus();
    }

    openBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);

    // Close on overlay click
    menu.addEventListener('click', function (e) {
      if (e.target === menu) closeMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
    });
  }

  // === SEARCH MODAL ===
  function initSearch() {
    const openBtns = document.querySelectorAll('[data-search-open]');
    const closeBtn = document.querySelector('.search-modal__close');
    const modal = document.querySelector('.search-modal');
    const input = document.querySelector('.search-modal__input');
    const results = document.querySelector('.search-modal__results');
    if (!modal || !input) return;

    const searchIndex = [
      { title: 'AI untuk Bantuan Sosial', url: 'pillars/social-aid.html', category: 'Pilar 01' },
      { title: 'AI untuk Ekonomi Inklusif', url: 'pillars/inclusive-economy.html', category: 'Pilar 02' },
      { title: 'AI untuk Climate Monitoring', url: 'pillars/climate.html', category: 'Pilar 03' },
      { title: 'AI Education Platform', url: 'pillars/education.html', category: 'Pilar 04' },
      { title: 'AI untuk Smart Agriculture', url: 'pillars/agriculture.html', category: 'Pilar 05' },
      { title: 'Data Dashboard', url: 'dashboard.html', category: 'Halaman' },
      { title: 'Berita & Wawasan', url: 'news.html', category: 'Halaman' },
      { title: 'Tentang Proyek', url: 'about.html', category: 'Halaman' },
    ];

    function openModal() {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => input.focus(), 100);
    }

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      input.value = '';
      if (results) results.innerHTML = '';
    }

    openBtns.forEach(function (btn) {
      btn.addEventListener('click', openModal);
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
      // Cmd/Ctrl + K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        modal.classList.contains('open') ? closeModal() : openModal();
      }
    });

    input.addEventListener('input', function () {
      const q = input.value.trim().toLowerCase();
      if (!results) return;
      if (!q) { results.innerHTML = ''; return; }

      const hits = searchIndex.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );

      if (!hits.length) {
        results.innerHTML = '<p style="color:var(--color-text-muted);font-size:0.9375rem;">Tidak ada hasil untuk "' + input.value + '"</p>';
        return;
      }

      results.innerHTML = hits.map(item => `
        <a href="${item.url}" class="search-result-item" style="display:block;text-decoration:none;">
          <div class="search-result-item__eyebrow">${item.category}</div>
          <div class="search-result-item__title">${item.title}</div>
        </a>
      `).join('');
    });
  }

  // === READING PROGRESS BAR ===
  function initReadingProgress() {
    const bar = document.querySelector('.reading-progress');
    if (!bar) return;

    window.addEventListener('scroll', function () {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      bar.style.width = Math.min(progress, 100) + '%';
    }, { passive: true });
  }

  // === ACTIVE NAV LINK ===
  function setActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav__link').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // === SMOOTH SCROLL ===
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Init all
  document.addEventListener('DOMContentLoaded', function () {
    initNav();
    initMobileMenu();
    initSearch();
    initReadingProgress();
    setActiveNavLink();
    initSmoothScroll();
  });
})();
