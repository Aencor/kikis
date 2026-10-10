import Animations from '../modules/animations';
import Theme from '../modules/theme';
import Navigation from '../modules/navigation';
import Testimonials from '../modules/testimonials';
import Contact from '../modules/contact';

export default {
  init() {
    Theme.init();
    Navigation.init();
    Testimonials.init();
    Contact.init();
    Animations.init();
  },
  finalize() {},
};