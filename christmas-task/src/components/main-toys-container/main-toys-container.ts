import {
  COLOR_FILTER, FAVORITE_FILTER, Filters, SHAPE_FILTER, SIZE_FILTER,
} from '@/common/constants/filter-constants';
import { IToysModel } from '@/models/toys-model';
import { defaultFilters, IDefaultFilters } from '@/models/default-filter-model';
import { desk, IDesk } from '@/models/select-model';
import SortServiceImplementaition from '@/common/services/sort.service';
import Control from '@/common/control';
import CardContainer from '../card-container/card-container';
import Controls from '../controls/controls';
import SortSelect from '../controls/sort-select';
import ModalError from '../modal-error/modal-error';
import FilterService from '@/common/services/filter.service';
import RangeFilterService from '@/common/services/range.service';

export default class MainToysContainer extends Control {
  cardContainer!: CardContainer;

  controls: Controls;

  selectValue: SortSelect;

  isDeskByName!: boolean;

  isDeskByCount!: boolean;

  data: IToysModel[];

  filterValue!: IToysModel[];

  sorted!: IToysModel[];

  modalError!: ModalError;

  storageFilter: IDefaultFilters | undefined;

  colorFilterArr!: string[];

  sizeFilterArr!: string[];

  shapeFilterArr!: string[];

  countFilterArr!: string[];

  yearFilterArr!: string[];

  onSave: ((defaultFilters: IDefaultFilters) => void) | undefined;

  constructor(parentNode: HTMLElement, data: IToysModel[], filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'main-container', '');
    const defaultFilters = filterStorage;
    this.data = FilterService.getFilterData(defaultFilters, data);
    this.controls = new Controls(this.node, filterStorage);
    this.selectValue = this.controls.sort.sortSelect;
    const desk = this.getSelectValue();
    this.selectValue.node.value = desk.select;
    this.cardContainer = new CardContainer(this.node, this.data);
    this.colorFilterArr = defaultFilters.color;
    this.sizeFilterArr = defaultFilters.size;
    this.shapeFilterArr = defaultFilters.shape;
    this.countFilterArr = defaultFilters.count;
    this.yearFilterArr = defaultFilters.year;
    this.rangeHandler(this.data);
    this.filterHandler(this.data);
    this.sortCard(desk);
  }

  public filterHandler(data: IToysModel[]): void {
    this.controls.filter.shapes.onFilter = (shape) => {
      if (this.shapeFilterArr.includes(SHAPE_FILTER.value[shape])) {
        this.shapeFilterArr = this.shapeFilterArr
          .filter((item) => item !== SHAPE_FILTER.value[shape]);
      } else {
        this.shapeFilterArr.push(SHAPE_FILTER.value[shape]);
      }
      this.applyFilter(data);
    };
    this.controls.filter.colors.onFilter = (color) => {
      if (this.colorFilterArr.includes(COLOR_FILTER.value[color])) {
        this.colorFilterArr = this.colorFilterArr
          .filter((item) => item !== COLOR_FILTER.value[color]);
      } else {
        this.colorFilterArr.push(COLOR_FILTER.value[color]);
      }
      this.applyFilter(data);
    };
    this.controls.filter.sizes.onFilter = (size) => {
      if (this.sizeFilterArr.includes(SIZE_FILTER.value[size])) {
        this.sizeFilterArr = this.sizeFilterArr.filter((item) => item !== SIZE_FILTER.value[size]);
      } else {
        this.sizeFilterArr.push(SIZE_FILTER.value[size]);
      }
      this.applyFilter(data);
    };
    this.controls.filter.favorite.form.onFilter = (check) => {
      defaultFilters.favorite = FAVORITE_FILTER.value[check];
      this.applyFilter(data);
    };
  }

  public applyFilter(data: IToysModel[]): IToysModel[] {
    defaultFilters.shape = this.shapeFilterArr,
    defaultFilters.color = this.colorFilterArr,
    defaultFilters.size = this.sizeFilterArr;
    defaultFilters.count = this.countFilterArr,
    defaultFilters.year = this.yearFilterArr;
    if (this.onSave) {
      this.onSave(defaultFilters);
    }
    this.data = FilterService.getFilterData(defaultFilters, data);
    if (this.data.length === 0) {
      this.modalError = new ModalError(this.node, 'Извините, совпадений не обнаружено');
    }
    this.cardContainer.destroy();
    this.cardContainer = new CardContainer(this.node, FilterService.getFilterData(defaultFilters, data));
    return this.data;
  }

  public selectName(): void {
    if (this.selectValue.node.value === 'sort-name-max') {
      desk.isDeskName = true;
      desk.isDeskCount = undefined;
    }
    if (this.selectValue.node.value === 'sort-name-min') {
      desk.isDeskName = false;
      desk.isDeskCount = undefined;
    }
    if (this.selectValue.node.value === 'sort-count-max') {
      desk.isDeskCount = true;
      desk.isDeskName = undefined;
    }
    if (this.selectValue.node.value === 'sort-count-min') {
      desk.isDeskCount = false;
      desk.isDeskName = undefined;
    }
    desk.select = this.selectValue.node.value;
    localStorage.setItem('select', JSON.stringify(desk));
    this.sortCard(desk);
  }

  public getSelectValue(): IDesk {
    const selectValue = JSON.parse(localStorage.getItem('select')!) || [];
    return selectValue;
  }

  public rangeHandler(data: IToysModel[]): void {
    this.controls.range.countValue.countSlider.onChange = (start, end) => {
      this.countFilterArr = [start, end];
      this.applyRangeFilter(data);
    };
    this.controls.range.yearValue.yearSlider.onChange = (start, end) => {
      this.yearFilterArr = [start, end];
      this.applyRangeFilter(data);
    };
    this.selectValue.onChange = () => {
      this.cardContainer.destroy();
      this.selectName();
    };
  }

  public applyRangeFilter(data: IToysModel[]): IToysModel[] {
    defaultFilters.shape = this.shapeFilterArr,
    defaultFilters.color = this.colorFilterArr,
    defaultFilters.size = this.sizeFilterArr;
    defaultFilters.count = this.countFilterArr,
    defaultFilters.year = this.yearFilterArr;
    if (this.onSave) {
      this.onSave(defaultFilters);
    }

    this.data = FilterService.getFilterData(defaultFilters, data);
    if (this.data.length === 0) {
      this.modalError = new ModalError(this.node, 'Извините, совпадений не обнаружено');
    }
    this.cardContainer.destroy();
    this.cardContainer = new CardContainer(this.node, FilterService.getFilterData(defaultFilters, data));
    return this.data;
  }

  public rangeSort(filtersRangeObj: Filters, data: IToysModel[]): IToysModel[] {
    const val = RangeFilterService.rangeSort(filtersRangeObj, data);
    this.data = val;
    this.cardContainer.destroy();
    this.cardContainer = new CardContainer(this.node, this.data);
    return this.data;
  }

  public sortCard(desk: IDesk | undefined): void {
    this.sorted = SortServiceImplementaition.transformByName(FilterService.getFilterData(defaultFilters, this.data), desk!);
    this.cardContainer.destroy();
    this.cardContainer = new CardContainer(this.node, this.sorted);
  }
}
