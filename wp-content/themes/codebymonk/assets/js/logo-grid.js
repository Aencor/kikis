/**
 * Block Script: Logo Grid
 */
(function () {
  function initLogoGrid(block) {
    if (typeof gsap === 'undefined') return;

    const title = block.querySelector('.grid-title');
    const logos = block.querySelectorAll('.grid-item');
    const cta = block.querySelector('.grid-cta');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    if (title) {
      tl.from(title, { y: -30, autoAlpha: 0, duration: 0.6 });
    }
    if (logos.length > 0) {
      tl.from(logos, { y: 30, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, '-=0.3');
    }
    if (cta) {
      tl.from(cta, { autoAlpha: 0, duration: 0.5 }, '-=0.2');
    }
  }

  // Inicializar en frontend al cargar el DOM
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.block-logo-grid, [data-block="logo-grid"]').forEach(initLogoGrid);
  });

  // Soporte para vista previa en vivo en el editor Gutenberg (ACF)
  if (typeof window !== 'undefined' && window.acf) {
    window.acf.addAction('render_block_preview/type=logo-grid', ($block) => {
      initLogoGrid($block[0] || $block);
    });
  }
})();

