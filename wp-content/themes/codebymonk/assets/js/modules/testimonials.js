import { gsap } from 'gsap';

export default {
  init() {
    const resultsSection = document.querySelector('.results');
    if (!resultsSection) return;

    let testimonialsData = [];
    const rawData = resultsSection.getAttribute('data-testimonials');
    if (rawData) {
      try {
        testimonialsData = JSON.parse(rawData);
      } catch (e) {
        console.error('Failed to parse testimonials data', e);
      }
    }

    if (!testimonialsData || testimonialsData.length === 0) return;

    let currentIndex = 0;
    const total = testimonialsData.length;

    const brandEl = resultsSection.querySelector('.case-brand-label');
    const yearEl = resultsSection.querySelector('.case-year-label');
    const quoteEl = resultsSection.querySelector('.case-quote');
    const metricsEl = resultsSection.querySelector('.metrics');
    const initialsEl = resultsSection.querySelector('.client-initials');
    const nameEl = resultsSection.querySelector('.client-name');
    const roleEl = resultsSection.querySelector('.client-role');
    const counterEl = resultsSection.querySelector('.slider-counter');
    const dots = resultsSection.querySelectorAll('.slider-dots button');
    const prevBtn = resultsSection.querySelector('.prev-btn');
    const nextBtn = resultsSection.querySelector('.next-btn');
    const caseContent = resultsSection.querySelector('.case-content');

    const render = (index) => {
      currentIndex = (index + total) % total;
      const t = testimonialsData[currentIndex];

      // GSAP animate content change
      if (caseContent && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.fromTo(
          caseContent,
          { opacity: 0, x: 25 },
          { opacity: 1, x: 0, duration: 0.45, ease: 'power3.out' }
        );
      }

      if (brandEl) brandEl.textContent = `CASO / ${t.brand}`;
      if (yearEl) yearEl.textContent = t.year;
      if (quoteEl) quoteEl.textContent = `“${t.quote}”`;
      if (initialsEl) initialsEl.textContent = t.initials;
      if (nameEl) nameEl.textContent = t.name;
      if (roleEl) roleEl.textContent = t.role;
      if (counterEl) counterEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

      // Update metrics
      if (metricsEl && t.metrics) {
        metricsEl.innerHTML = t.metrics
          .map(
            (m) => `<div><strong>${m.value}</strong><span>${m.label}</span></div>`
          )
          .join('');
      }

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => render(currentIndex - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => render(currentIndex + 1));
    }
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => render(i));
    });
  }
};
