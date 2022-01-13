import Control from '@/common/components/control';
import {
  COUNT_RANGE, STORAGE_FAVOURITE_NAME, STORAGE_FILTERS_NAME, YEAR_RANGE,
} from '@/common/constants/constants';
import SearchService from '@/common/services/search.service';
import StorageService from '@/common/services/storage.service';
import Footer from '@/components/footer/footer';
import Header from '@/components/header-container/header';
import MainToysContainer from '@/components/main-toys-container/main-toys-container';
import ToysDataModel from '@/models/toys-data-model';
import { IToysModel } from '@/models/toys-model';

export default class ToysPage extends Control {
  public container!: MainToysContainer;

  public header: Header;

  public control!: Control;

  private model: ToysDataModel;

  private searchValue!: IToysModel[];

  public searchService!: SearchService;

  private footer!: Footer;

  private favouriteStorage!: StorageService;

  private filterStorage: StorageService;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    this.header = new Header(this.node);
    this.model = new ToysDataModel();
    this.filterStorage = new StorageService();
    this.filterStorage.loadFromLocalStorage(STORAGE_FILTERS_NAME);
    this.model.build().then(() => {
      this.render();
    });
  }

  private render(): void {
    const data = this.model.getData();
    this.container = new MainToysContainer(this.node, data, this.filterStorage.getData());
    this.node.onclick = () => {
      this.favouriteStorage = new StorageService();
      this.favouriteStorage.loadFromLocalStorage(STORAGE_FAVOURITE_NAME);
      const favoriteCount = this.favouriteStorage.getData();
      this.header.headerControls.favorite.node.innerHTML = `<span>${favoriteCount.length}</span>`;
    };
    this.container.destroy();
    this.container = new MainToysContainer(this.node, data, this.filterStorage.getData());
    this.footer = new Footer(this.node);
    this.search(data);
    this.settingsFilters();
  }

  private settingsFilters(): void {
    this.container.onSave = (defaultFilters) => {
      this.filterStorage.setData(defaultFilters);
      this.filterStorage.saveToStorage(STORAGE_FILTERS_NAME);
    };
    this.container.controls.sort.onReset = () => {
      const defaultFilters = {
        shape: [],
        color: [],
        size: [],
        count: COUNT_RANGE,
        year: YEAR_RANGE,
        favorite: [],
      };
      this.filterStorage.setData(defaultFilters);
      this.filterStorage.saveToStorage(STORAGE_FILTERS_NAME);
      this.container.destroy();
      this.footer.destroy();
      this.container = new MainToysContainer(this.node, this.model.getData(), defaultFilters);
      this.footer = new Footer(this.node);
      this.settingsFilters();
    };
  }

  private search(data: IToysModel[]): void {
    this.searchService = new SearchService();
    this.searchService.data = data;
    this.header.headerControls.onSearch = (val) => {
      this.searchValue = this.searchService.search(val);
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
      this.footer.destroy();
      this.container = new MainToysContainer(
        this.node,
        this.searchValue,
        this.filterStorage.getData(),
      );
      this.footer = new Footer(this.node);
    };
  }
}
