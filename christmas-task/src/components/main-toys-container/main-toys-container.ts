import {
  COLOR_FILTER, FAVORITE_FILTER, SHAPE_FILTER, SIZE_FILTER,
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

export default class MainToysContainer extends Control {
  public cardContainer!: CardContainer;

  public controls: Controls;

  public selectValue: SortSelect;

  public isDeskByName!: boolean;

  public isDeskByCount!: boolean;

  private sorted!: IToysModel[];

  private modalError!: ModalError;

  private colorFilterArr!: string[];

  private sizeFilterArr!: string[];

  private shapeFilterArr!: string[];

  private countFilterArr!: string[];

  private yearFilterArr!: string[];

  public onSave: ((defaultFilters: IDefaultFilters) => void) | undefined;

  constructor(parentNode: HTMLElement, public data: IToysModel[], public filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'main-container', '');
    this.data = FilterService.getFilterData(filterStorage, data);
    this.controls = new Controls(this.node, filterStorage);
    this.colorFilterArr = filterStorage.color;
    this.sizeFilterArr = filterStorage.size;
    this.shapeFilterArr = filterStorage.shape;
    this.countFilterArr = filterStorage.count;
    this.yearFilterArr = filterStorage.year;
    this.selectValue = this.controls.sort.sortSelect;
    this.cardContainer = new CardContainer(this.node, this.data);
    const desk = this.getSelectValue();
    this.selectValue.node.value = desk.select;
    this.rangeHandler(data);
    this.filterHandler(data);
    this.sortCard(desk);
  }

  public filterHandler(data: IToysModel[]): void {
    this.controls.filter.shapes.onFilter = (shape) => {
      if (this.shapeFilterArr.includes(SHAPE_FILTER.value[shape])) {
        this.shapeFilterArr = this.shapeFilterArr.filter((item) => item !== SHAPE_FILTER.value[shape]);
      } else {
        this.shapeFilterArr.push(SHAPE_FILTER.value[shape]);
      }
      this.applyFilter(data);
    };
    this.controls.filter.colors.onFilter = (color) => {
      if (this.colorFilterArr.includes(COLOR_FILTER.value[color])) {
        this.colorFilterArr = this.colorFilterArr.filter((item) => item !== COLOR_FILTER.value[color]);
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

  private applyFilter(data: IToysModel[]): IToysModel[] {
    const defaultFilters = <IDefaultFilters> {
      shape: this.shapeFilterArr,
      color: this.colorFilterArr,
      size: this.sizeFilterArr,
      count: this.countFilterArr,
      year: this.yearFilterArr
    }
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

  private selectName(): void {
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

  private getSelectValue(): IDesk {
    const selectValue = JSON.parse(localStorage.getItem('select')!) || [];
    return selectValue;
  }

  private rangeHandler(data: IToysModel[]): void {
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
    const defaultFilters = <IDefaultFilters> {
      shape: this.shapeFilterArr,
      color: this.colorFilterArr,
      size: this.sizeFilterArr,
      count: this.countFilterArr,
      year: this.yearFilterArr
    }
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

  private sortCard(desk: IDesk | undefined): void {
    this.sorted = SortServiceImplementaition.transformByName(FilterService.getFilterData(defaultFilters, this.data), desk!);
    this.cardContainer.destroy();
    this.cardContainer = new CardContainer(this.node, this.sorted);
  }
}
