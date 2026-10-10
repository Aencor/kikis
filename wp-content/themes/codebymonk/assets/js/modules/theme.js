export default {
  init() {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (!toggleBtn) return;

    const sunIcon = toggleBtn.querySelector('.icon-sun');
    const moonIcon = toggleBtn.querySelector('.icon-moon');

    const updateIcons = (theme) => {
      if (theme === 'dark') {
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
        toggleBtn.setAttribute('aria-label', 'Activar modo claro');
      } else {
        if (sunIcon) sunIcon.style.display = 'block';
        if (moonIcon) moonIcon.style.display = 'none';
        toggleBtn.setAttribute('aria-label', 'Activar modo oscuro');
      }
    };

    // Current theme
    let currentTheme = document.documentElement.dataset.theme || 'light';
    updateIcons(currentTheme);

    toggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = currentTheme;
      try {
        localStorage.setItem('kikis-theme', currentTheme);
      } catch (e) {}
      updateIcons(currentTheme);
    });

    // Listen to system preference changes if no user preference is stored
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('kikis-theme')) {
          const newTheme = e.matches ? 'dark' : 'light';
          document.documentElement.dataset.theme = newTheme;
          updateIcons(newTheme);
        }
      });
    }
  }
};
