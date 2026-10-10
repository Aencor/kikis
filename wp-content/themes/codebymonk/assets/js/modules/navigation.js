/**
 * Navigation Module
 * Handles mobile menu toggling and smooth scrolling for all anchor links.
 */

export default {
  init() {
    const menuBtn = document.getElementById('menu-toggle-btn');
    const nav = document.getElementById('main-navigation');

    if (menuBtn && nav) {
      menuBtn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('nav-open');
        menuBtn.classList.toggle('is-active', isOpen);
        menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      // Close on link click inside nav
      nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          nav.classList.remove('nav-open');
          menuBtn.classList.remove('is-active');
          menuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Global smooth anchor scrolling with header offset & intelligent fallback
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const hash = link.getAttribute('href');
      if (!hash || hash === '#' || hash === '#!') return;

      const targetId = hash.substring(1);
      
      // Try direct ID lookup
      let targetEl = document.getElementById(targetId);

      // Fallback lookups by data-block or block class
      if (!targetEl) {
        const aliasMap = {
          'inicio': ['[data-block="hero"]', '.hero', '#main-content'],
          'servicios': ['[data-block="services"]', '.services'],
          'portafolio': ['[data-block="portfolio"]', '.portfolio'],
          'casos': ['[data-block="results"]', '.results'],
          'proceso': ['[data-block="process"]', '.process'],
          'contacto': ['[data-block="contact"]', '.contact', '#contacto'],
        };

        const fallbacks = aliasMap[targetId] || [`[data-block="${targetId}"]`, `.${targetId}`];
        for (const selector of fallbacks) {
          targetEl = document.querySelector(selector);
          if (targetEl) break;
        }
      }

      if (targetEl) {
        e.preventDefault();

        // Calculate offset (taking sticky header into account)
        const header = document.querySelector('.site-header');
        const headerOffset = header ? header.offsetHeight + 16 : 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });

        // Update URL hash without causing instant jump
        if (history.pushState) {
          history.pushState(null, null, hash);
        }
      }
    });
  },
};
