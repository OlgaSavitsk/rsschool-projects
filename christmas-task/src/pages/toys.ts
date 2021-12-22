import Control from '../common/control';
import { FilterService } from '../common/services/filter.service';
import { SearchService } from '../common/services/search.service';
import { StorageFilter } from '../common/services/storage';
import Header from '../components/header-container/header';
import MainToysContainer from '../components/main-toys-container/main-toys-container';
import { ToysDataModel } from '../models/toys-data-model';
import { IToysModel } from '../models/toys-model';

export default class Toys extends Control {
  container!: MainToysContainer;
  header: Header;
  control!: Control
  model: ToysDataModel;
  searchValue!: IToysModel[];
  filterStorage: StorageFilter;
  searchService!: SearchService;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    this.model = new ToysDataModel()
    this.filterStorage = new StorageFilter()
    this.filterStorage.loadFromLocalStorage()
    this.header = new Header(this.node)
    this.model.build().then(result => {
      this.start()
    }) 
  }

  private start() {
    let data = this.model.getData()
    this.container = new MainToysContainer(this.node, data, this.filterStorage.getData())
    
    this.container.node.onclick = () => {
      let favoriteCount = JSON.parse(localStorage.getItem('favorite')!) || [];
      this.header.headerControls.favorite.node.innerHTML = `<span>${favoriteCount.length}</span>`
    } 
    this.searchService = new SearchService(data)
    this.header.headerControls.onSearch = (val) => {
      this.searchValue = SearchService.search(val)
      if (this.searchValue.length === 0) {
        this.header.headerControls.errorField.node.innerHTML = 'Извините, совпадений не обнаружено'
      } else {
        this.header.headerControls.errorField.node.innerHTML = "";
      }
        this.header.headerControls.searchInput.node.onblur = () => {
          if (this.searchValue.length === 0) {
            this.header.headerControls.errorField.node.innerHTML = 'Извините, совпадений не обнаружено'
          }
        };
        this.header.headerControls.searchInput.node.onfocus = () => {
          this.header.headerControls.errorField.node.innerHTML = "";
        }
      this.container.destroy()
      this.container = new MainToysContainer(this.node, this.searchValue, this.filterStorage.getData())
    }
    this.settingsFilters()
  }

  settingsFilters() {
    this.container.onSave = (defaultFilters) => {
      this.filterStorage.setData(defaultFilters)
    }
    this.container.controls.sort.onReset = () => {
      const defaultFilters = {
        shape: ([] as string[]),
        color: ([] as string[]),
        size: ([] as string[]),
        count: ['1', '12'],
        year: ['1940', '2020'],
      } 
      this.filterStorage.setData(defaultFilters)
      this.container.destroy()
      this.container = new MainToysContainer(this.node, this.model.getData(), defaultFilters)
     this.settingsFilters()
    }
  }
}
