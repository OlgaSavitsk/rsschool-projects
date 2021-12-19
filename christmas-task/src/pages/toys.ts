import Control from '../common/control';
import { FilterService } from '../common/services/filter.service';
import SortServiceImplementaition from '../common/services/sort.service';
import Header from '../components/header-container/header';
import MainToysContainer from '../components/main-toys-container/main-toys-container';
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
    const filterService = new FilterService()
    this.container.node.onclick = () => {
      let favoriteCount = JSON.parse(localStorage.getItem('favorite')!) || [];
      this.header.headerContainer.headerControls.favorite.node.innerHTML = `<span>${favoriteCount.length}</span>`
    }
  }
}
