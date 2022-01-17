import Control from '@/common/components/control';
import Footer from '@/components/footer/footer';
import GaragePage from './garage';
import Toys from './garage';
import WinnerPage from './winner';

export default class Application extends Control {
  garagePage: GaragePage;
  winnerPage: WinnerPage | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', '', '');
    this.garagePage = new GaragePage(this.node);
    const footer = new Footer(this.node);
    /* this.garagePage.toWinnerPage = () => {
      this.header.destroy();
      this.garagePage.destroy();
      footer.destroy();
      this.winnerPage = new WinnerPage(this.node);
    }; */
  }
}
