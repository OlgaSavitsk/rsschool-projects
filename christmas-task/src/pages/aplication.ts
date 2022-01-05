import Control from '@/common/components/control';
import Footer from '@/components/footer/footer';
import Header from '@/components/header-container/header';
import StartPage from './start';
import Toys from './toys';

export default class Application extends Control {
  public toysPage!: Toys;

  public startPage: StartPage;

  public header: Header;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', '', '');
    this.header = new Header(this.node);
    this.startPage = new StartPage(this.node);
    const footer = new Footer(this.node);
    this.startPage.toToyPage = () => {
      this.header.destroy();
      this.startPage.destroy();
      footer.destroy();
      this.toysPage = new Toys(this.node);
    };
  }
}
