import Control from '../common/control';
import Card from '../components/card-container/card';
import Header from '../components/header/header';
import MainToysContainer from '../components/main-toys-container/main-toys-container';
import ModalErrorr from '../components/modal-error/modal-error';

export default class Toys extends Control {
  container!: MainToysContainer;
  header: Header;
  control!: Control

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    this.header = new Header(this.node)
    this.container = new MainToysContainer(this.node)
    this.container.node.onclick = () => {
      let favoriteCount = JSON.parse(localStorage.getItem('favorite')!) || [];
      this.header.headerContainer.headerControls.favorite.node.innerHTML = `<span>${favoriteCount.length}</span>`
    }
  }
}
