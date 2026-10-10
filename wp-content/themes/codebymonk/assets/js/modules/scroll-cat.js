/**
 * 2D Animated Cat Scroll Slider Module
 * Tracks page scroll progress with a walking/sliding 2D cat along a bottom progress bar.
 */

export default {
  init() {
    if (typeof window === 'undefined') return;

    // Check if container already exists
    if (document.querySelector('.cat-scroll-container')) return;

    // Build the DOM element
    const container = document.createElement('div');
    container.className = 'cat-scroll-container';
    container.setAttribute('aria-hidden', 'true');

    container.innerHTML = `
      <div class="cat-scroll-track" id="catScrollTrack" title="Desliza para navegar">
        <div class="cat-scroll-bar" id="catScrollBar"></div>
        <div class="cat-scroll-avatar is-idle" id="catScrollAvatar" role="slider" aria-label="Progreso de página" tabindex="0">
          <div class="cat-bubble" id="catBubble">¡Miau! 0%</div>
          <div class="cat-scroll-character" id="catCharacter">
            <svg class="cat-svg" viewBox="0 0 76 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Back legs -->
              <g class="cat-leg-bl">
                <rect x="14" y="24" width="7" height="18" rx="3.5" class="cat-fur-shadow" />
                <ellipse cx="17.5" cy="42" rx="4.5" ry="3" class="cat-fur-shadow" />
              </g>
              <g class="cat-leg-fl">
                <rect x="36" y="24" width="7" height="18" rx="3.5" class="cat-fur-shadow" />
                <ellipse cx="39.5" cy="42" rx="4.5" ry="3" class="cat-fur-shadow" />
              </g>

              <!-- Tail -->
              <g class="cat-tail">
                <path d="M12 28 C4 26, 2 12, 8 8 C11 5, 14 9, 11 14 C9 17, 10 23, 16 26" 
                      fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" class="cat-fur-main" />
              </g>

              <!-- Body group -->
              <g class="cat-body-group">
                <!-- Torso -->
                <ellipse cx="28" cy="26" rx="18" ry="12" class="cat-fur-main" />

                <!-- Front legs (closer to viewer) -->
                <g class="cat-leg-br">
                  <rect x="20" y="25" width="7.5" height="18" rx="3.75" class="cat-fur-main" />
                  <ellipse cx="23.75" cy="43" rx="5" ry="3.2" class="cat-fur-main" />
                </g>
                <g class="cat-leg-fr">
                  <rect x="42" y="25" width="7.5" height="18" rx="3.75" class="cat-fur-main" />
                  <ellipse cx="45.75" cy="43" rx="5" ry="3.2" class="cat-fur-main" />
                </g>

                <!-- Head -->
                <ellipse cx="50" cy="18" rx="13" ry="11" class="cat-fur-main" />

                <!-- Left Ear -->
                <g class="cat-ear-left">
                  <polygon points="42,10 47,1 51,9" class="cat-fur-main" />
                  <polygon points="44,9 47,3 49,9" class="cat-ear-inner" />
                </g>

                <!-- Right Ear -->
                <g class="cat-ear-right">
                  <polygon points="52,9 56,1 61,10" class="cat-fur-main" />
                  <polygon points="54,9 56,3 58,9" class="cat-ear-inner" />
                </g>

                <!-- Collar & Bell -->
                <path d="M43 25 C47 28, 54 28, 57 24" class="cat-collar" fill="none" />
                <circle cx="50" cy="27.5" r="2.8" class="cat-bell" />

                <!-- Eyes -->
                <g class="cat-eyes">
                  <!-- Left Eye -->
                  <ellipse cx="46.5" cy="16.5" rx="2.5" ry="3.2" class="cat-eyes-color" />
                  <ellipse cx="47" cy="16.5" rx="1.3" ry="2.2" class="cat-pupil" />
                  <circle cx="46.2" cy="15.2" r="0.7" fill="#ffffff" />

                  <!-- Right Eye -->
                  <ellipse cx="55.5" cy="16.5" rx="2.5" ry="3.2" class="cat-eyes-color" />
                  <ellipse cx="56" cy="16.5" rx="1.3" ry="2.2" class="cat-pupil" />
                  <circle cx="55.2" cy="15.2" r="0.7" fill="#ffffff" />
                </g>

                <!-- Snout & Whiskers -->
                <polygon points="50.5,19.5 49,21 52,21" class="cat-nose" />
                <path d="M50.5 21 L50.5 22.5 Q49 24 47.5 22.5 M50.5 22.5 Q52 24 53.5 22.5" 
                      fill="none" stroke="var(--pink)" stroke-width="0.9" stroke-linecap="round" />

                <!-- Whiskers Left -->
                <line x1="44" y1="19.5" x2="36" y2="18" class="cat-whisker" />
                <line x1="44" y1="21" x2="35" y2="22" class="cat-whisker" />

                <!-- Whiskers Right -->
                <line x1="57" y1="19.5" x2="65" y2="18" class="cat-whisker" />
                <line x1="57" y1="21" x2="66" y2="22" class="cat-whisker" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(container);

    const track = container.querySelector('#catScrollTrack');
    const bar = container.querySelector('#catScrollBar');
    const avatar = container.querySelector('#catScrollAvatar');
    const character = container.querySelector('#catCharacter');
    const bubble = container.querySelector('#catBubble');

    let lastScrollY = window.scrollY || 0;
    let scrollTimeout = null;
    let isDragging = false;
    let lastPawTime = 0;

    const phrases = [
      '¡Miau! {p}%',
      '¡Scrolleando! {p}%',
      '¡Ronroneando! {p}%',
      '¡Avanzando! {p}%',
      '¡Buen ritmo! {p}%',
      '¡Casi llegamos! {p}%',
      '¡Listo! 100%',
    ];

    const getPhrase = (pct) => {
      if (pct >= 99) return '¡Llegamos! 100% 🐾';
      if (pct <= 2) return '¡Inicio! 0% 🐱';
      if (pct > 45 && pct < 55) return `¡Mitad del camino! ${pct}%`;
      return `¡Miau! ${pct}%`;
    };

    // Paw particle effect on walk
    const spawnPawTrail = (progressPct) => {
      const now = Date.now();
      if (now - lastPawTime < 140) return;
      lastPawTime = now;

      const particle = document.createElement('div');
      particle.className = 'cat-slider-paw-particle';
      particle.style.left = `${progressPct}%`;
      particle.innerHTML = `
        <svg viewBox="0 0 24 24" fill="currentColor">
          <ellipse cx="12" cy="16" rx="5" ry="4" />
          <ellipse cx="6" cy="9" rx="2.5" ry="3.5" transform="rotate(-20 6 9)" />
          <ellipse cx="11" cy="6" rx="2.5" ry="3.5" />
          <ellipse cx="18" cy="9" rx="2.5" ry="3.5" transform="rotate(20 18 9)" />
        </svg>
      `;
      track.appendChild(particle);

      setTimeout(() => {
        if (particle.parentNode) particle.parentNode.removeChild(particle);
      }, 1200);
    };

    // Update Cat & Progress Position
    const updateProgress = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 50) {
        container.classList.add('is-hidden');
        return;
      } else {
        container.classList.remove('is-hidden');
      }

      const currentScroll = window.scrollY || window.pageYOffset || 0;
      const progress = Math.min(Math.max(currentScroll / docHeight, 0), 1);
      const pct = Math.round(progress * 100);

      // Width of track vs avatar dimensions to keep within edges
      const avatarWidth = avatar.offsetWidth || 76;
      const trackWidth = window.innerWidth;
      const usableWidth = trackWidth - avatarWidth;
      const avatarLeftPx = (avatarWidth / 2) + (progress * usableWidth);
      const avatarLeftPct = (avatarLeftPx / trackWidth) * 100;

      // Update styles
      bar.style.width = `${progress * 100}%`;
      avatar.style.left = `${avatarLeftPct}%`;
      avatar.setAttribute('aria-valuenow', pct);
      bubble.textContent = getPhrase(pct);

      // Direction check
      const diff = currentScroll - lastScrollY;
      if (Math.abs(diff) > 1) {
        if (diff > 0) {
          // Scrolling down -> facing right
          character.classList.remove('facing-left');
        } else {
          // Scrolling up -> facing left
          character.classList.add('facing-left');
        }

        // Switch to walking animation
        avatar.classList.remove('is-idle');
        avatar.classList.add('is-walking');
        avatar.classList.add('is-active');

        // Spawn particle
        spawnPawTrail(avatarLeftPct);

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
          avatar.classList.remove('is-walking');
          avatar.classList.remove('is-active');
          avatar.classList.add('is-idle');
        }, 180);
      }

      lastScrollY = currentScroll;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();

    // Click / Drag to Scroll
    const handleSeek = (clientX) => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const trackRect = track.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(clientX - trackRect.left, trackRect.width));
      const targetRatio = clickX / trackRect.width;
      const targetScroll = targetRatio * docHeight;

      window.scrollTo({
        top: targetScroll,
        behavior: isDragging ? 'auto' : 'smooth',
      });
    };

    track.addEventListener('click', (e) => {
      if (e.target.closest('#catScrollAvatar') && !isDragging) {
        // Fun easter egg on cat click
        bubble.textContent = '¡Purrrr! 🐾❤️';
        avatar.classList.add('is-active');
        setTimeout(() => avatar.classList.remove('is-active'), 1500);
        return;
      }
      handleSeek(e.clientX);
    });

    // Dragging support
    const startDrag = (e) => {
      isDragging = true;
      avatar.classList.add('is-active');
      avatar.classList.add('is-walking');
      avatar.classList.remove('is-idle');
      document.body.style.userSelect = 'none';
      e.preventDefault();
    };

    const moveDrag = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      handleSeek(clientX);
    };

    const endDrag = () => {
      if (!isDragging) return;
      isDragging = false;
      avatar.classList.remove('is-walking');
      avatar.classList.remove('is-active');
      avatar.classList.add('is-idle');
      document.body.style.userSelect = '';
    };

    avatar.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', moveDrag);
    window.addEventListener('mouseup', endDrag);

    avatar.addEventListener('touchstart', startDrag, { passive: false });
    window.addEventListener('touchmove', moveDrag, { passive: true });
    window.addEventListener('touchend', endDrag);

    // Easter egg: double click for happy flip
    avatar.addEventListener('dblclick', () => {
      character.style.transform = 'scale(1.2) rotate(360deg)';
      bubble.textContent = '¡Yeeeaaah! ✨';
      setTimeout(() => {
        character.style.transform = '';
      }, 600);
    });
  },
};
