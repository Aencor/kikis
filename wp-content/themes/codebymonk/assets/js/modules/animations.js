import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Flip from 'gsap/Flip';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import TextPlugin from 'gsap/TextPlugin';
import Observer from 'gsap/Observer';

// Registrar plugins principales de GSAP
gsap.registerPlugin(ScrollTrigger, Flip, ScrollToPlugin, TextPlugin, Observer);

// Exponer en window para scripts de bloques individuales encolados por WordPress
if (typeof window !== 'undefined') {
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;
  window.Flip = Flip;
  window.ScrollToPlugin = ScrollToPlugin;
  window.TextPlugin = TextPlugin;
  window.Observer = Observer;
}

export { gsap, ScrollTrigger, Flip, ScrollToPlugin, TextPlugin, Observer };

export default {
  init() {
    // Inicializaciones globales de GSAP (ScrollTrigger refresh al cargar la página)
    ScrollTrigger.refresh();
  },
};

