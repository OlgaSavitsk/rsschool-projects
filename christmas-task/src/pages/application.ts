import Control from '../common/control';
import Footer from '../components/footer/footer';

export default class Application extends Control {
  footer: Footer;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container', '');
    this.footer = new Footer(this.node);
  }
}
