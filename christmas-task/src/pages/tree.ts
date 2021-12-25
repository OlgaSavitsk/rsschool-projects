import Control from '@/common/control';
import StorageFavorite from '@/common/services/storage-favorite.service';
import Header from '@/components/header-container/header';
import MainTreeContainer from '@/components/main-tree-container/main-tree-container';
import ToysDataModel from '@/models/toys-data-model';


export default class TreePage extends Control {
  private model: ToysDataModel;
    public container!: MainTreeContainer;
    header: Header;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    this.header = new Header(this.node);
    this.model = new ToysDataModel();
    StorageFavorite.loadFromLocalStorage()
    this.model.build().then((result) => {
      this.render();
    });
  }

  private render(): void {
        const data = this.model.getData();
        const favoriteCount = StorageFavorite.getData();
        this.container = new MainTreeContainer(this.node, favoriteCount, data);
        this.node.onclick = () => {
          //const favoriteCount = StorageFavorite.getData();
          //this.header.headerControls.favorite.node.innerHTML = `<span>${favoriteCount.length}</span>`;
        };
        //this.container.destroy();
        //this.container = new MainTreeContainer(this.node, favoriteCount);
    }
}