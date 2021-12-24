import Control from '@/common/control';
import Footer from '@/components/footer/footer';
import Toys from './toys';

export default class Application extends Control {
  public toysPage: Toys;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', '', '');
    this.toysPage = new Toys(this.node);
    const footer = new Footer(document.body);
  }
}
