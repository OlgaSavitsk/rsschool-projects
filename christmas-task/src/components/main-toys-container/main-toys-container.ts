import {
  COLOR_FILTER, FAVORITE_FILTER, Filters, SHAPE_FILTER, SIZE_FILTER,
} from '@/common/constants/filter-constants';
import { IToysModel } from '@/models/toys-model';
import { defaultFilters, filterArr, IDefaultFilters } from '@/models/default-filter-model';
import { desk, IDesk } from '@/models/select-model';
import SortServiceImplementaition from '@/common/services/sort.service';
import Control from '@/common/components/control';
import CardContainer from '../card-container/card-container';
import Controls from '../controls/controls';
import SortSelect from '../controls/sort-select';
import FilterService from '@/common/services/filter.service';
import ModalError from '../modal-error/modal-error';
import { SORT_FILTER } from '@/common/constants/constants';

export default class MainToysContainer extends Control {
  public cardContainer!: CardContainer;

  public controls: Controls;

  public selectValue: SortSelect;

  public isDeskByName!: boolean;

  public isDeskByCount!: boolean;

  private sorted!: IToysModel[];

  public modalError!: ModalError;

  private countFilterArr!: string[];

  private yearFilterArr!: string[];

  public favoriteValue!: string[];

  public onSave: ((defaultFilters: IDefaultFilters) => void) | undefined;

  constructor(
    parentNode: HTMLElement,
    public data: IToysModel[],
    public filterStorage: IDefaultFilters,
  ) {
    super(parentNode, 'div', 'main-container', '');
    this.data = FilterService.getFilterData(filterStorage, data);
    this.controls = new Controls(this.node, filterStorage);
    filterArr.color = filterStorage.color;
    filterArr.size = filterStorage.size;
    filterArr.shape = filterStorage.shape;
    this.countFilterArr = filterStorage.count;
    this.yearFilterArr = filterStorage.year;
    this.selectValue = this.controls.sort.sortSelect;
    this.cardContainer = new CardContainer(this.node, this.data);
    this.selectValue.node.value = desk.select;
    this.rangeHandler(data);
    this.setFilterEventListener(data);
  }

  public setFilterEventListener(data: IToysModel[]): void {
    this.controls.filter.shapes.onFilter = (shape) => {
      this.filterHandler(data, shape, SHAPE_FILTER);
    };
    this.controls.filter.colors.onFilter = (color) => {
      this.filterHandler(data, color, COLOR_FILTER);
    };
    this.controls.filter.sizes.onFilter = (size) => {
      this.filterHandler(data, size, SIZE_FILTER);
    };
    this.controls.filter.favorite.form.onFilter = (check) => {
      console.log(defaultFilters.favorite);
      filterArr.favorite.splice(0, 1, FAVORITE_FILTER.value[check]);
      this.applyFilter(data);
    };
  }

  private filterHandler(
    data: IToysModel[],
    param: string,
    filter: { property: Filters; value: any; },
  ): void {
    const filterArrParam = Object.keys(filterArr)[filter.property];
    if (filterArr[filterArrParam].includes(filter.value[param])) {
      filterArr[filterArrParam] = filterArr[filterArrParam]
        .filter((item: any) => item !== filter.value[param]);
    } else {
      filterArr[filterArrParam].push(filter.value[param]);
    }
    this.applyFilter(data);
  }

  private selectName(): void {
    Object.values(SORT_FILTER).map((selectItem) => {
      if (this.selectValue.node.value === selectItem) {
        desk[selectItem] = !desk[selectItem];
        desk.select = selectItem;
      } else desk[selectItem] = false;
      return false;
    });
    localStorage.setItem('select', JSON.stringify(desk));
    this.sortCard(desk);
  }

  private rangeHandler(data: IToysModel[]): void {
    this.controls.range.countValue.countSlider.onChange = (start, end) => {
      this.countFilterArr = [start, end];
      this.applyFilter(data);
    };
    this.controls.range.yearValue.yearSlider.onChange = (start, end) => {
      this.yearFilterArr = [start, end];
      this.applyFilter(data);
    };
    this.selectValue.onChange = () => {
      this.cardContainer.destroy();
      this.selectName();
    };
  }

  private applyFilter(data: IToysModel[]): IToysModel[] {
    const defaultFilters = {
      shape: filterArr.shape,
      color: filterArr.color,
      size: filterArr.size,
      count: this.countFilterArr,
      year: this.yearFilterArr,
      favorite: filterArr.favorite,
    };
    if (this.onSave) {
      this.onSave(defaultFilters);
    }
    this.data = FilterService.getFilterData(defaultFilters, data);
    if (this.data.length === 0) {
      this.modalError = new ModalError(this.node, 'Извините, совпадений не обнаружено');
    }
    this.cardContainer.destroy();
    this.cardContainer = new CardContainer(
      this.node,
      FilterService.getFilterData(defaultFilters, data),
    );
    return this.data;
  }

  private sortCard(desk: IDesk): void {
    this.sorted = SortServiceImplementaition
      .sortToys(FilterService.getFilterData(defaultFilters, this.data), desk);
    this.cardContainer.destroy();
    this.cardContainer = new CardContainer(this.node, this.sorted);
  }
}
