<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo("charset"); ?>">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/svg+xml" href="<?php echo esc_url(get_template_directory_uri()); ?>/assets/img/favicon.svg">
  <script>
    // Inline script to prevent flash of wrong theme
    (function() {
      try {
        var savedTheme = localStorage.getItem('kikis-theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var theme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
        document.documentElement.dataset.theme = theme;
      } catch (e) {}
    })();
  </script>
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <?php wp_body_open(); ?>

  <header class="site-header">
    <a class="logo" href="#inicio" aria-label="Kiki's Marketing, inicio">
      <span class="logo-cat" aria-hidden="true">
        <i></i>
        <i></i>
      </span>
      <span>kiki's</span>
      <small>MARKETING</small>
    </a>

    <nav class="nav" id="main-navigation" aria-label="Navegación principal">
      <a href="#servicios">Servicios</a>
      <a href="#portafolio">Portafolio</a>
      <a href="#casos">Casos de éxito</a>
      <a class="nav-cta" href="#contacto">
        Hablemos 
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>
      </a>
    </nav>

    <div class="header-actions">
      <button
        class="theme-toggle"
        id="theme-toggle-btn"
        type="button"
        aria-label="Cambiar modo oscuro/claro"
      >
        <svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" stroke-width="1.8" />
          <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
        </svg>
        <svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true" style="display:none;">
          <path d="M20 15.4A8.2 8.2 0 0 1 8.6 4a8.2 8.2 0 1 0 11.4 11.4Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.8" />
        </svg>
      </button>

      <button
        class="menu-button"
        id="menu-toggle-btn"
        type="button"
        aria-expanded="false"
        aria-label="Menú principal"
      >
        <span></span>
        <span></span>
      </button>
    </div>
  </header>