import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Expose on window for any inline or block scripts
if (typeof window !== 'undefined') {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
}

export { gsap, ScrollTrigger };

export default {
  init() {
    const media = gsap.matchMedia();

    media.add('(prefers-reduced-motion: no-preference)', () => {
      // 1. Hero Parallax
      if (document.querySelector('.hero')) {
        gsap.to('.hero-copy', {
          yPercent: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });

        gsap.to('.cat', {
          yPercent: -16,
          rotation: -4,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 2. Section Headings Reveal
      gsap.utils.toArray('.section-heading, .portfolio-heading').forEach((heading) => {
        gsap.from(heading.children, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // 3. Service Cards Stagger
      if (document.querySelector('.service-list')) {
        gsap.from('.service-card', {
          x: -42,
          opacity: 0,
          duration: 0.75,
          stagger: 0.13,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.service-list',
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 4. Portfolio Projects Reveal & Image Zoom Parallax
      gsap.utils.toArray('.project').forEach((project) => {
        const image = project.querySelector('.project-image');
        const photo = project.querySelector('img');
        const info = project.querySelector('.project-info');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: project,
            start: 'top 83%',
            toggleActions: 'play none none reverse',
          },
        });

        if (image) {
          tl.from(image, {
            clipPath: 'inset(0 0 100% 0)',
            duration: 1.05,
            ease: 'power4.inOut',
          });
        }

        if (info) {
          tl.from(info, { y: 24, opacity: 0, duration: 0.6 }, '-=0.35');
        }

        if (photo) {
          gsap.fromTo(
            photo,
            { yPercent: -5, scale: 1.08 },
            {
              yPercent: 5,
              scale: 1.08,
              ease: 'none',
              scrollTrigger: {
                trigger: project,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      });

      // 5. Results & Case Study Section
      if (document.querySelector('.results')) {
        gsap.from('.results-intro > *', {
          y: 44,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.results',
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.from('.case-study > *', {
          x: 45,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.case-study',
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 6. Process Steps Staggered Bounce
      if (document.querySelector('.process-steps')) {
        gsap.from('.process-steps article', {
          y: 60,
          opacity: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: 'back.out(1.25)',
          scrollTrigger: {
            trigger: '.process-steps',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      }

      // 7. Contact Section Animations
      if (document.querySelector('.contact')) {
        gsap.from('.contact-copy > *', {
          x: -45,
          opacity: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact',
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.from('.contact-form', {
          y: 70,
          rotation: 1.5,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    });

    window.addEventListener('load', () => {
      ScrollTrigger.refresh();
    });
  },
};
