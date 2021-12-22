import { COLOR_FILTER, FAVORITE_FILTER, Filters, SHAPE_FILTER, SIZE_FILTER } from "../../common/constants/filter-constants";
import Control from "../../common/control";
import { FilterService } from "../../common/services/filter.service";
import { RangeFilterService } from "../../common/services/range.service";
import SortServiceImplementaition from "../../common/services/sort.service";
import { defaultFilters, IDefaultFilters } from "../../models/default-filter-model";
import { desk, IDesk } from "../../models/select-model";
import { IToysModel } from "../../models/toys-model";
import CardContainer from "../card-container/card-container";
import Controls from "../controls/controls";
import SortSelect from "../controls/sort-select";
import ModalError from "../modal-error/modal-error";

export default class MainToysContainer extends Control {
  cardContainer!: CardContainer;
  controls: Controls;
  selectValue: SortSelect;
  isDeskByName!: boolean;
  isDeskByCount!: boolean
  data: IToysModel[];
  filterValue!: IToysModel[];
  sorted!: IToysModel[];
  modalError!: ModalError;
  storageFilter: IDefaultFilters | undefined;
  onSave: ((defaultFilters: IDefaultFilters) => void) | undefined
  colorFilterArr: string[];
  sizeFilterArr: string[];
  shapeFilterArr: string[];
  countFilterArr: string[];
  yearFilterArr: string[];
  dataDefault: IToysModel[];

  constructor(parentNode: HTMLElement, data: IToysModel[], filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'main-container', '');
    this.dataDefault = data
    const defaultFilters: IDefaultFilters = filterStorage
    const desk = this.getSelectValue()
    this.data = this.getFilterData(defaultFilters, data)
    console.log('this.data', this.data)
    this.colorFilterArr = defaultFilters.color;
    this.sizeFilterArr = defaultFilters.size;
    this.shapeFilterArr = defaultFilters.shape;
    this.countFilterArr = defaultFilters.count;
    this.yearFilterArr = defaultFilters.year
    this.controls = new Controls(this.node, filterStorage)
    this.selectValue = this.controls.sort.sortSelect
    this.cardContainer = new CardContainer(this.node, this.data)
    this.rangeHandler(this.dataDefault)
    this.filterHandler(this.dataDefault)
    this.sortCard(desk)
    this.selectValue.node.value = desk.select
  }

  filterHandler(data: IToysModel[]) {
    this.controls.filter.shapes.onFilter = (shape) => {  
      if(this.shapeFilterArr.includes(SHAPE_FILTER.value[shape])) { 
        this.shapeFilterArr = this.shapeFilterArr.filter(item => item !== SHAPE_FILTER.value[shape]) 
      } else {
        this.shapeFilterArr.push(SHAPE_FILTER.value[shape])
      }
      this.applyFilter(data)
    } 
    this.controls.filter.colors.onFilter = (color) => { 
      if(this.colorFilterArr.includes(COLOR_FILTER.value[color])) { 
        this.colorFilterArr = this.colorFilterArr.filter(item => item !== COLOR_FILTER.value[color]) 
      } else {
        this.colorFilterArr.push(COLOR_FILTER.value[color])
      } 
      this.applyFilter(data)
    }
    this.controls.filter.sizes.onFilter = (size) => {
      if(this.sizeFilterArr.includes(SIZE_FILTER.value[size])) { 
        this.sizeFilterArr = this.sizeFilterArr.filter(item => item !== SIZE_FILTER.value[size]) 
      } else {
        this.sizeFilterArr.push(SIZE_FILTER.value[size])
      }
      this.applyFilter(data)
    }
    this.controls.filter.favorite.form.onFilter = (check) => { 
      this.favoriteSort(FAVORITE_FILTER, check)
    } 
  }

  applyFilter(data: IToysModel[]) {
    defaultFilters.shape = this.shapeFilterArr,
    defaultFilters.color = this.colorFilterArr,
    defaultFilters.size = this.sizeFilterArr
    defaultFilters.count = this.countFilterArr,
    defaultFilters.year = this.yearFilterArr
    if(this.onSave) {
      this.onSave(defaultFilters)
    }
   
    this.getFilterData(defaultFilters, data)
    this.data = this.getFilterData(defaultFilters, data)
    console.log(data, this.data)
    if(this.data.length === 0) {
      this.modalError = new ModalError(this.node, 'Извините, совпадений не обнаружено')
    }
    this.cardContainer.destroy()
    this.cardContainer = new CardContainer(this.node, this.data)
    return this.data
  }

  getFilterData(defaultFilters: IDefaultFilters, data: IToysModel[]) {
    return data.filter(item => {
      return Object.keys(defaultFilters).every(propertyName => {
        if(defaultFilters[propertyName].length === 0) {
          return data
        } 
        if(propertyName === 'count' || propertyName === 'year') {
          return +item[propertyName] >= +defaultFilters[propertyName][0] && +item[propertyName] <= +defaultFilters[propertyName][1] 
        }
        if(defaultFilters[propertyName].length > 1) {
          return defaultFilters[propertyName].includes(item[propertyName])
        }
        else {
          return item[propertyName].indexOf(defaultFilters[propertyName]) > -1
        } 
      });
    })
  }

  favoriteSort(filter: { property: string; value: any }, param: string) {
    this.filterValue = FilterService.sort(filter, param, this.data)
    this.cardContainer.destroy()
    this.cardContainer = new CardContainer(this.node, this.filterValue)
  }

  selectName() {
    if(this.selectValue.node.value === 'sort-name-max') {
      desk.isDeskName = true
      desk.isDeskCount = undefined
    } 
    if(this.selectValue.node.value === 'sort-name-min')  {
      desk.isDeskName = false
      desk.isDeskCount = undefined
    }
    if(this.selectValue.node.value === 'sort-count-max')  {
      desk.isDeskCount = true
      desk.isDeskName = undefined
    }
    if(this.selectValue.node.value === 'sort-count-min')  {
      desk.isDeskCount = false
      desk.isDeskName = undefined
    }
    desk.select = this.selectValue.node.value
    localStorage.setItem('select', JSON.stringify(desk));
    this.sortCard(desk)
  }

  getSelectValue() {
    const selectValue = JSON.parse(localStorage.getItem('select')!) || [];
    return selectValue
  }

  rangeHandler(data: IToysModel[]) {
    this.controls.range.countValue.countSlider.onChange = (start, end) => {
      this.countFilterArr = [start, end]
      this.applyRangeFilter(data)
    }
    this.controls.range.yearValue.yearSlider.onChange = (start, end) => {
     this.yearFilterArr = [start, end]
      this.applyRangeFilter(data)
    } 
    this.selectValue.onChange = () => {
      this.cardContainer.destroy() 
     this.selectName()
      
    }  
  }

  applyRangeFilter(data: IToysModel[]) {
    defaultFilters.shape = this.shapeFilterArr,
    defaultFilters.color = this.colorFilterArr,
    defaultFilters.size = this.sizeFilterArr
    defaultFilters.count = this.countFilterArr,
    defaultFilters.year = this.yearFilterArr
    if(this.onSave) {
      this.onSave(defaultFilters)
    }
    this.getFilterData(defaultFilters, data)
    this.data = this.getFilterData(defaultFilters, data)
    if(this.data.length === 0) {
      this.modalError = new ModalError(this.node, 'Извините, совпадений не обнаружено')
    }
    this.cardContainer.destroy()
    this.cardContainer = new CardContainer(this.node, this.data)
    return this.data
  }

  rangeSort(filtersRangeObj: Filters, data: IToysModel[]) {
    let val = RangeFilterService.rangeSort(filtersRangeObj, data)
    this.data = val
    this.cardContainer.destroy()
    this.cardContainer = new CardContainer(this.node, this.data)
    return this.data
  }

  sortCard(desk: IDesk | undefined) {
    this.sorted = SortServiceImplementaition.transformByName(this.getFilterData(defaultFilters, this.data), desk!)
    this.cardContainer.destroy()
    this.cardContainer = new CardContainer(this.node, this.sorted)
  }
}