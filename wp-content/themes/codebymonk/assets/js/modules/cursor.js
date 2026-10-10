export default {
  init() {
    // Only run on devices with a fine pointer (mouse) and no reduced motion preference
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    // Create Cursor Elements
    const cursor = document.createElement('div');
    cursor.className = 'cat-cursor';
    cursor.innerHTML = `
      <div class="cat-cursor-main">
        <svg class="cat-cursor-paw" viewBox="0 0 48 48" aria-hidden="true">
          <ellipse cx="24" cy="31" rx="11" ry="9" fill="currentColor" />
          <ellipse cx="10" cy="21" rx="5" ry="7" fill="currentColor" transform="rotate(-24 10 21)" />
          <ellipse cx="21" cy="13" rx="5" ry="7" fill="currentColor" transform="rotate(-5 21 13)" />
          <ellipse cx="37" cy="20" rx="5" ry="7" fill="currentColor" transform="rotate(24 37 20)" />
        </svg>
      </div>
    `;
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let lastTrailX = mouseX;
    let lastTrailY = mouseY;
    let pawSide = false; // Toggle left / right paw

    const pawSvgString = `
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <ellipse cx="24" cy="31" rx="11" ry="9" fill="currentColor" />
        <ellipse cx="10" cy="21" rx="5" ry="7" fill="currentColor" transform="rotate(-24 10 21)" />
        <ellipse cx="21" cy="13" rx="5" ry="7" fill="currentColor" transform="rotate(-5 21 13)" />
        <ellipse cx="37" cy="20" rx="5" ry="7" fill="currentColor" transform="rotate(24 37 20)" />
      </svg>
    `;

    const createPawTrail = (x, y, angle) => {
      const trail = document.createElement('div');
      trail.className = 'cat-paw-trail';
      trail.style.left = `${x}px`;
      trail.style.top = `${y}px`;
      const rot = angle + (pawSide ? 15 : -15);
      trail.style.setProperty('--rot', `${rot}deg`);
      trail.innerHTML = pawSvgString;
      document.body.appendChild(trail);

      pawSide = !pawSide;

      // Remove element after animation finishes
      setTimeout(() => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      }, 900);
    };

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Distance check for leaving footprints
      const dist = Math.hypot(mouseX - lastTrailX, mouseY - lastTrailY);
      if (dist > 55) {
        const angle = (Math.atan2(mouseY - lastTrailY, mouseX - lastTrailX) * 180) / Math.PI + 90;
        createPawTrail(mouseX, mouseY, angle);
        lastTrailX = mouseX;
        lastTrailY = mouseY;
      }
    });

    // Mousedown & Mouseup effects
    window.addEventListener('mousedown', () => {
      cursor.classList.add('is-clicked');
      createPawTrail(mouseX, mouseY, 0);
    });

    window.addEventListener('mouseup', () => {
      cursor.classList.remove('is-clicked');
    });

    // Interactive element hover detection
    const handleInteractives = () => {
      const interactives = document.querySelectorAll(
        'a, button, input, select, textarea, .service-card, .project, .cat-3d-canvas, .theme-toggle, .menu-button'
      );

      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('is-hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovered'));
      });
    };

    handleInteractives();

    // Re-bind when DOM mutations happen (e.g. Gutenberg block updates or sliders)
    const observer = new MutationObserver(handleInteractives);
    observer.observe(document.body, { childList: true, subtree: true });

    // Smooth Cursor Physics Loop
    const render = () => {
      // Lerp smooth follow
      cursorX += (mouseX - cursorX) * 0.22;
      cursorY += (mouseY - cursorY) * 0.22;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;

      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);
  },
};
