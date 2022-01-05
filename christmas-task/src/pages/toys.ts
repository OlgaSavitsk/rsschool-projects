import Control from '@/common/components/control';
import SearchService from '@/common/services/search.service';
import StorageFilter from '@/common/services/storage';
import StorageFavorite from '@/common/services/storage-favorite.service';
import Footer from '@/components/footer/footer';
import Header from '@/components/header-container/header';
import MainToysContainer from '@/components/main-toys-container/main-toys-container';
import { IDefaultFilters } from '@/models/default-filter-model';
import ToysDataModel from '@/models/toys-data-model';
import { IToysModel } from '@/models/toys-model';

/* type RenderCardOptions = {
  parentNode: HTMLElement,
  data: IToysModel[],
  filterStorage: IDefaultFilters
}; */

export default class ToysPage extends Control {
  public container!: MainToysContainer;

  public header: Header;

  public control!: Control;

  private model: ToysDataModel;

  private searchValue!: IToysModel[];

  public filterStorage: StorageFilter;

  public searchService!: SearchService;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    this.header = new Header(this.node);
    this.model = new ToysDataModel();
    this.filterStorage = new StorageFilter();
    this.filterStorage.loadFromLocalStorage();
    StorageFavorite.loadFromLocalStorage();
    this.model.build().then(() => {
      this.render();
    });
  }

  private render(): void {
    const data = this.model.getData();
    this.container = new MainToysContainer(this.node, data, this.filterStorage.getData());
    this.node.onclick = () => {
      const favoriteCount = StorageFavorite.getData();
      this.header.headerControls.favorite.node.innerHTML = `<span>${favoriteCount.length}</span>`;
    };
    this.container.destroy();
    this.container = new MainToysContainer(this.node, data, this.filterStorage.getData());
    this.search(data);
    this.settingsFilters();
    const footer = new Footer(this.node);
  }

  private settingsFilters(): void {
    this.container.onSave = (defaultFilters) => {
      this.filterStorage.setData(defaultFilters);
    };
    this.container.controls.sort.onReset = () => {
      const defaultFilters = {
        shape: ([] as string[]),
        color: ([] as string[]),
        size: ([] as string[]),
        count: ['1', '12'],
        year: ['1940', '2020'],
        favorite: '',
      };
      this.filterStorage.setData(defaultFilters);
      this.container.destroy();
      this.container = new MainToysContainer(this.node, this.model.getData(), defaultFilters);
      this.settingsFilters();
    };
  }

  private search(data: IToysModel[]): void {
    this.searchService = new SearchService(data);
    this.header.headerControls.onSearch = (val) => {
      this.searchValue = SearchService.search(val);
      if (this.searchValue.length === 0) {
        this.header.headerControls.errorField.node.innerHTML = 'Извините, совпадений не обнаружено';
      } else {
        this.header.headerControls.errorField.node.innerHTML = '';
      }
      this.header.headerControls.searchInput.node.onblur = () => {
        if (this.searchValue.length === 0) {
          this.header.headerControls.errorField.node.innerHTML = 'Извините, совпадений не обнаружено';
        }
      };
      this.header.headerControls.searchInput.node.onfocus = () => {
        this.header.headerControls.errorField.node.innerHTML = '';
      };
      this.container.destroy();
      this.container = new MainToysContainer(
        this.node,
        this.searchValue,
        this.filterStorage.getData(),
      );
    };
  }
}
