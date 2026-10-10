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

      // Close on link click
      nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          nav.classList.remove('nav-open');
          menuBtn.classList.remove('is-active');
          menuBtn.setAttribute('aria-expanded', 'false');
        });
      });
    }
  }
};
