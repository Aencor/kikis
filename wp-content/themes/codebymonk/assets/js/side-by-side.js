/**
 * Block Script: Side By Side
 */
(function () {
  function initSideBySide(block) {
    if (typeof gsap === 'undefined') return;

    const textContent = block.querySelector('.text-content');
    const imageContent = block.querySelector('.image-content');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    if (textContent) {
      tl.from(textContent, { y: -40, autoAlpha: 0, duration: 0.8 });
    }

    if (imageContent) {
      tl.from(imageContent, { y: 40, autoAlpha: 0, duration: 0.8 }, '-=0.4');
    }
  }

  // Inicializar en frontend al cargar el DOM
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.block-side-by-side, [data-block="side-by-side"]').forEach(initSideBySide);
  });

  // Soporte para vista previa en vivo en el editor Gutenberg (ACF)
  if (typeof window !== 'undefined' && window.acf) {
    window.acf.addAction('render_block_preview/type=side-by-side', ($block) => {
      initSideBySide($block[0] || $block);
    });
  }
})();

