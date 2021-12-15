import Control from '../common/control';
import SortServiceImplementaition from '../common/services/sort.service';
import Card from '../components/card-container/card';
import Header from '../components/header/header';
import MainToysContainer from '../components/main-toys-container/main-toys-container';
import ModalErrorr from '../components/modal-error/modal-error';
import { ToysDataModel } from '../models/toys-data-model';

export default class Toys extends Control {
  container!: MainToysContainer;
  header: Header;
  control!: Control
  sortService!: SortServiceImplementaition;
  model: ToysDataModel;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    this.header = new Header(this.node)
    this.model = new ToysDataModel()
    this.model.build().then(result => {
      this.start()
    }) 
  }

  private start() {
    let data = this.model.getData()
    this.container = new MainToysContainer(this.node, data)
    this.container.node.onclick = () => {
      let favoriteCount = JSON.parse(localStorage.getItem('favorite')!) || [];
      this.header.headerContainer.headerControls.favorite.node.innerHTML = `<span>${favoriteCount.length}</span>`
    }
  }
}
