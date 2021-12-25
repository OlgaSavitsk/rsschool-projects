import Control from '@/common/control';
import Footer from '@/components/footer/footer';
import StartPage from './start';
import Toys from './toys';
import TreePage from './tree';

export default class Application extends Control {
  public toysPage: Toys;
  public treePage: TreePage;
  public startPage: StartPage;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', '', '');
    this.startPage = new StartPage(this.node)
    this.treePage = new TreePage(this.node)
    this.toysPage = new Toys(this.node);
    const footer = new Footer(document.body);
  }
}
