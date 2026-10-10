import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d={diagonal ? "M7 17 17 7M8 7h9v9" : "M5 12h14m-5-5 5 5-5 5"}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const Paw = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <ellipse cx="24" cy="31" rx="11" ry="9" fill="currentColor" />
    <ellipse cx="10" cy="21" rx="5" ry="7" fill="currentColor" transform="rotate(-24 10 21)" />
    <ellipse cx="21" cy="13" rx="5" ry="7" fill="currentColor" transform="rotate(-5 21 13)" />
    <ellipse cx="37" cy="20" rx="5" ry="7" fill="currentColor" transform="rotate(24 37 20)" />
  </svg>
);

const Spark = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M24 2c1 15 7 21 22 22-15 1-21 7-22 22C23 31 17 25 2 24 17 23 23 17 24 2Z" fill="currentColor" />
  </svg>
);

const ThemeIcon = ({ dark }: { dark: boolean }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    {dark ? (
      <path d="M20 15.4A8.2 8.2 0 0 1 8.6 4a8.2 8.2 0 1 0 11.4 11.4Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
    ) : (
      <>
        <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" />
      </>
    )}
  </svg>
);

const Fish = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path
      d="M8 24c7-10 18-12 27-5l7-6v22l-7-6c-9 7-20 5-27-5Zm6 0h.1"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="3"
    />
  </svg>
);

const Yarn = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <circle cx="22" cy="23" r="14" fill="none" stroke="currentColor" strokeWidth="3" />
    <path d="M10 18c8-5 18-2 25 5M10 28c8 3 17 1 24-6M18 9c-3 8 1 19 10 27m7-3c5 1 8 4 10 8" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
  </svg>
);

const CatDoodles = () => (
  <div className="cat-doodles" aria-hidden="true">
    <Paw />
    <Fish />
    <Yarn />
  </div>
);

const services = [
  {
    number: "01",
    title: "Estrategia digital",
    text: "Encontramos ese hilo del que tirar: posicionamiento, audiencias y un plan accionable para crecer.",
    tags: ["Research", "Estrategia", "Campañas"],
  },
  {
    number: "02",
    title: "Social media",
    text: "Contenido con personalidad, gestión de comunidad y campañas que hacen que tu marca caiga de pie.",
    tags: ["Contenido", "Community", "Paid media"],
  },
  {
    number: "03",
    title: "Identidad de marca",
    text: "Creamos universos visuales y verbales memorables para marcas que no quieren parecerse a todas.",
    tags: ["Branding", "Dirección de arte", "Copy"],
  },
  {
    number: "04",
    title: "Web & e-commerce",
    text: "Experiencias digitales bonitas, intuitivas y obsesionadas con convertir curiosidad en acción.",
    tags: ["UX/UI", "Web", "Conversión"],
  },
];

const work = [
  {
    client: "MIMO STUDIO",
    category: "Branding · Social",
    title: "Diseño que se saborea",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
    className: "project project-large",
  },
  {
    client: "NUBA SKIN",
    category: "E-commerce · Campaign",
    title: "Belleza sin filtros",
    image:
      "https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1000",
    className: "project project-small",
  },
  {
    client: "CASA CLUB",
    category: "Social · Content",
    title: "Tu nuevo lugar favorito",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200",
    className: "project project-wide",
  },
];

const testimonials = [
  {
    brand: "NUBA SKIN",
    year: "2024",
    quote: "Pasamos de ser una marca bonita a ser una marca que la gente busca, recomienda y compra.",
    metrics: [
      ["+214%", "Ventas online"],
      ["4.8×", "Retorno en ads"],
      ["+38K", "Comunidad nueva"],
    ],
    initials: "LP",
    name: "Laura Peña",
    role: "Fundadora, Nuba Skin",
  },
  {
    brand: "MIMO STUDIO",
    year: "2024",
    quote: "Kiki’s entendió nuestra esencia desde el primer día y la convirtió en una identidad imposible de ignorar.",
    metrics: [
      ["+176%", "Interacción"],
      ["3.2×", "Alcance orgánico"],
      ["+24K", "Nuevos seguidores"],
    ],
    initials: "AM",
    name: "Ana Molina",
    role: "Directora, Mimo Studio",
  },
  {
    brand: "CASA CLUB",
    year: "2025",
    quote: "No solo llenamos la agenda: construimos una comunidad que vuelve, comparte y se siente parte de la marca.",
    metrics: [
      ["92%", "Ocupación"],
      ["+68%", "Reservas directas"],
      ["6.1×", "Retorno de campaña"],
    ],
    initials: "JR",
    name: "Javier Ríos",
    role: "Co-fundador, Casa Club",
  },
];

export default function App() {
  const appRef = useRef<HTMLElement>(null);
  const caseContentRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = window.localStorage.getItem("kikis-theme");
    return savedTheme ? savedTheme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const testimonial = testimonials[activeTestimonial];

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    window.localStorage.setItem("kikis-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".hero-copy", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(".cat", {
          yPercent: -16,
          rotation: -4,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.utils
          .toArray<HTMLElement>(".section-heading, .portfolio-heading")
          .forEach((heading) => {
            gsap.from(heading.children, {
              y: 48,
              opacity: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: heading,
                start: "top 82%",
                toggleActions: "play none none reverse",
              },
            });
          });

        gsap.from(".service-card", {
          x: -42,
          opacity: 0,
          duration: 0.75,
          stagger: 0.13,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".service-list",
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.utils.toArray<HTMLElement>(".project").forEach((project) => {
          const image = project.querySelector(".project-image");
          const photo = project.querySelector("img");
          const info = project.querySelector(".project-info");

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: project,
              start: "top 83%",
              toggleActions: "play none none reverse",
            },
          });

          timeline
            .from(image, {
              clipPath: "inset(0 0 100% 0)",
              duration: 1.05,
              ease: "power4.inOut",
            })
            .from(info, { y: 24, opacity: 0, duration: 0.6 }, "-=0.35");

          if (photo) {
            gsap.fromTo(
              photo,
              { yPercent: -5, scale: 1.08 },
              {
                yPercent: 5,
                scale: 1.08,
                ease: "none",
                scrollTrigger: {
                  trigger: project,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                },
              },
            );
          }
        });

        gsap.from(".results-intro > *", {
          y: 44,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".results",
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".case-study > *", {
          x: 45,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".case-study",
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".process-steps article", {
          y: 60,
          opacity: 0,
          duration: 0.85,
          stagger: 0.14,
          ease: "back.out(1.25)",
          scrollTrigger: {
            trigger: ".process-steps",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".contact-copy > *", {
          x: -45,
          opacity: 0,
          duration: 0.8,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact",
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from(".contact-form", {
          y: 70,
          rotation: 1.5,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-form",
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, appRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      media.revert();
      context.revert();
    };
  }, []);

  useLayoutEffect(() => {
    if (!caseContentRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const animation = gsap.fromTo(
      caseContentRef.current,
      { opacity: 0, x: 28 },
      { opacity: 1, x: 0, duration: 0.55, ease: "power3.out" },
    );

    return () => animation.kill();
  }, [activeTestimonial]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
    event.currentTarget.reset();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main ref={appRef}>
      <header className="site-header">
        <a className="logo" href="#inicio" aria-label="Kiki's Marketing, inicio">
          <span className="logo-cat" aria-hidden="true">
            <i />
            <i />
          </span>
          <span>kiki&apos;s</span>
          <small>MARKETING</small>
        </a>

        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Navegación principal">
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#portafolio" onClick={closeMenu}>Portafolio</a>
          <a href="#casos" onClick={closeMenu}>Casos de éxito</a>
          <a className="nav-cta" href="#contacto" onClick={closeMenu}>
            Hablemos <Arrow diagonal />
          </a>
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}
            aria-pressed={darkMode}
            onClick={() => setDarkMode(!darkMode)}
          >
            <ThemeIcon dark={darkMode} />
          </button>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Agencia creativa & digital</p>
          <h1>Ideas con <em>garra.</em><br />Marcas que dejan huella.</h1>
          <p className="hero-intro">
            Estrategia, creatividad y mucho instinto para que tu marca no solo
            se vea bonita: que conecte, crezca y venda.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#portafolio">
              Ver nuestro trabajo <Arrow />
            </a>
            <a className="text-link" href="#contacto">
              Cuéntanos tu idea <Arrow diagonal />
            </a>
          </div>
        </div>

        <div className="hero-art" aria-label="Ilustración de un gato creativo">
          <div className="orbit orbit-one">SOCIAL</div>
          <div className="orbit orbit-two">BRANDING</div>
          <Spark />
          <div className="cat">
            <div className="cat-ear cat-ear-left" />
            <div className="cat-ear cat-ear-right" />
            <div className="cat-face">
              <span className="eye" />
              <span className="eye" />
              <span className="nose" />
              <span className="whisker whisker-left" />
              <span className="whisker whisker-right" />
            </div>
          </div>
          <p className="art-note">Curiosidad estratégica<br />desde 2020</p>
        </div>

        <div className="scroll-note">Scroll para descubrir <span>↓</span></div>
      </section>

      <section className="marquee" aria-label="Especialidades">
        <div>
          ESTRATEGIA <Paw /> CREATIVIDAD <Paw /> CONTENIDO <Paw /> RESULTADOS <Paw />
          ESTRATEGIA <Paw /> CREATIVIDAD <Paw />
        </div>
      </section>

      <section className="section services" id="servicios">
        <div className="section-heading">
          <p className="kicker">Lo que hacemos</p>
          <h2>Todo lo que tu marca necesita para sacar las uñas.</h2>
          <p>No hacemos ruido porque sí. Creamos estrategias con intención y diseños que se recuerdan.</p>
        </div>

        <div className="service-list">
          {services.map((service) => (
            <article className="service-card" key={service.number}>
              <span className="service-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <div className="tags">
                {service.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              <a href="#contacto" aria-label={`Consultar por ${service.title}`}>
                <Arrow diagonal />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="section portfolio" id="portafolio">
        <div className="portfolio-heading">
          <div>
            <p className="kicker">Portafolio seleccionado</p>
            <h2>Trabajo que<br /><em>nos hace ronronear.</em></h2>
          </div>
          <a className="text-link" href="#contacto">Ver todos los proyectos <Arrow diagonal /></a>
        </div>

        <div className="projects">
          {work.map((item, index) => (
            <article className={item.className} key={item.client}>
              <div className="project-image">
                <img src={item.image} alt={`Proyecto creativo para ${item.client}`} />
                <span className="project-index">0{index + 1}</span>
                <a href="#contacto" aria-label={`Ver proyecto ${item.client}`}><Arrow diagonal /></a>
              </div>
              <div className="project-info">
                <div>
                  <p>{item.client}</p>
                  <h3>{item.title}</h3>
                </div>
                <span>{item.category}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="results" id="casos">
        <div className="results-intro">
          <p className="kicker">Casos de éxito</p>
          <h2>Menos miau.<br /><em>Más resultados.</em></h2>
          <p>
            Nos encanta una idea brillante, pero nos gustan aún más los números
            que demuestran que funciona.
          </p>
          <a className="button button-light" href="#contacto">Quiero esos resultados <Arrow /></a>
        </div>

        <div className="case-study">
          <div className="case-top">
            <span>CASO / {testimonial.brand}</span>
            <span>{testimonial.year}</span>
          </div>
          <div className="case-content" ref={caseContentRef} aria-live="polite">
            <blockquote>“{testimonial.quote}”</blockquote>
            <div className="metrics">
              {testimonial.metrics.map(([value, label]) => (
                <div key={label}><strong>{value}</strong><span>{label}</span></div>
              ))}
            </div>
            <div className="client">
              <span>{testimonial.initials}</span>
              <p><strong>{testimonial.name}</strong><br />{testimonial.role}</p>
            </div>
          </div>
          <div className="slider-controls">
            <div className="slider-dots" aria-label="Seleccionar testimonio">
              {testimonials.map((item, index) => (
                <button
                  className={index === activeTestimonial ? "active" : ""}
                  type="button"
                  aria-label={`Ver caso de ${item.brand}`}
                  aria-current={index === activeTestimonial}
                  onClick={() => setActiveTestimonial(index)}
                  key={item.brand}
                />
              ))}
            </div>
            <div className="slider-arrows">
              <button
                type="button"
                aria-label="Testimonio anterior"
                onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
              >
                <Arrow />
              </button>
              <span>{String(activeTestimonial + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
              <button
                type="button"
                aria-label="Testimonio siguiente"
                onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)}
              >
                <Arrow />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="process section">
        <div className="section-heading process-heading">
          <p className="kicker">Cómo trabajamos</p>
          <h2>Curiosas por naturaleza.<br />Estratégicas por elección.</h2>
        </div>
        <div className="process-steps">
          {[
            ["01", "Olfateamos", "Escuchamos, investigamos y hacemos las preguntas incómodas."],
            ["02", "Trazamos", "Definimos una ruta clara, ambiciosa y totalmente tuya."],
            ["03", "Creamos", "Convertimos estrategia en ideas que nadie puede ignorar."],
            ["04", "Medimos", "Optimizamos, aprendemos y volvemos a saltar más alto."],
          ].map(([number, title, text]) => (
            <article key={number}>
              <CatDoodles />
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact section" id="contacto">
        <div className="contact-copy">
          <Paw />
          <p className="kicker">¿Tienes un proyecto?</p>
          <h2>Hagamos algo<br /><em>inolvidable.</em></h2>
          <p>Cuéntanos qué tienes en mente. Prometemos responder antes de gastar nuestras siete vidas.</p>
          <a href="mailto:hola@kikismarketing.com">hola@kikismarketing.com <Arrow diagonal /></a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label>
            Tu nombre
            <input required name="name" placeholder="¿Cómo te llamas?" />
          </label>
          <label>
            Tu email
            <input required type="email" name="email" placeholder="hola@tumarca.com" />
          </label>
          <label>
            ¿En qué podemos ayudarte?
            <select required name="service" defaultValue="">
              <option value="" disabled>Selecciona un servicio</option>
              <option>Estrategia digital</option>
              <option>Social media</option>
              <option>Identidad de marca</option>
              <option>Web & e-commerce</option>
            </select>
          </label>
          <label>
            Cuéntanos un poco más
            <textarea required name="message" rows={3} placeholder="Tu idea, tus objetivos, tus sueños..." />
          </label>
          <button className="button button-dark" type="submit">
            {sent ? "¡Mensaje enviado!" : "Enviar mensaje"} <Arrow />
          </button>
          {sent && <p className="form-success" role="status">Gracias. Muy pronto afilamos ideas contigo.</p>}
        </form>
      </section>

      <footer>
        <div className="footer-main">
          <a className="logo footer-logo" href="#inicio">
            <span className="logo-cat" aria-hidden="true"><i /><i /></span>
            <span>kiki&apos;s</span><small>MARKETING</small>
          </a>
          <p>Estrategia, creatividad y un poquito de magia felina.</p>
          <div className="socials">
            <a href="#contacto">Instagram</a>
            <a href="#contacto">LinkedIn</a>
            <a href="#contacto">Behance</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Kiki&apos;s Marketing</span>
          <span>Hecho con estrategia y café</span>
        </div>
      </footer>
    </main>
  );
}
