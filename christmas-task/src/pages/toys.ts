import Control from '../common/control';
import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import ToysMainContainer from '../components/toys-main-container/toys-main-container';

export default class Toys extends Control {
  footer: Footer;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container', '');
    const header = new Header(this.node)
    const mainContainer = new ToysMainContainer(this.node)
    this.footer = new Footer(this.node);
  }
}
