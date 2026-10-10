/**
 * Block Script: Hero
 */
(function () {
  function initHero(block) {
    if (typeof gsap === 'undefined') return;

    const title = block.querySelector('.hero-title');
    const content = block.querySelector('.h-content');
    const cta = block.querySelector('.hero-cta');
    const mask = block.querySelector('.circle-mask');
    const image = block.querySelector('.hero-image');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    if (mask) {
      tl.from(mask, { autoAlpha: 0, duration: 0.6 });
    }
    if (title) {
      tl.from(title, { y: -30, autoAlpha: 0, duration: 0.6 }, '-=0.3');
    }
    if (content) {
      tl.from(content, { autoAlpha: 0, duration: 0.6 }, '-=0.3');
    }
    if (cta) {
      tl.from(cta, { y: 30, autoAlpha: 0, duration: 0.6 }, '-=0.3');
    }
    if (image) {
      tl.from(image, { scale: 0.85, autoAlpha: 0, duration: 0.7 }, '-=0.4');
    }
  }

  // Inicializar en frontend al cargar el DOM
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.block-hero, [data-block="hero"]').forEach(initHero);
  });

  // Soporte para vista previa en vivo en el editor Gutenberg (ACF)
  if (typeof window !== 'undefined' && window.acf) {
    window.acf.addAction('render_block_preview/type=hero', ($block) => {
      initHero($block[0] || $block);
    });
  }
})();