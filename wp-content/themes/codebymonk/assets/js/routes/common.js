import Animations from '../modules/animations';
import Theme from '../modules/theme';
import Navigation from '../modules/navigation';
import Testimonials from '../modules/testimonials';
import Contact from '../modules/contact';
import Cat3D from '../modules/cat-3d';
import CatCursor from '../modules/cursor';
import ScrollCat from '../modules/scroll-cat';

export default {
  init() {
    Theme.init();
    Navigation.init();
    Testimonials.init();
    Contact.init();
    Animations.init();
    Cat3D.init();
    CatCursor.init();
    ScrollCat.init();
  },

  finalize() {},
};