import { COLOR_FILTER, FAVORITE_FILTER, SHAPE_FILTER, SIZE_FILTER } from "../../common/constants/filter-constants";
import Control from "../../common/control";
import { FilterService } from "../../common/services/filter.service";
import { RangeFilterService } from "../../common/services/range.service";
import SortServiceImplementaition from "../../common/services/sort.service";
import { StorageFilter } from "../../common/services/storage";
import { ToysDataModel } from "../../models/toys-data-model";
import { IDesk, IToysModel } from "../../models/toys-model";
import CardContainer from "../card-container/card-container";
import Controls from "../controls/controls";
import SortSelect from "../controls/sort-select";

export interface IDefaultFilters {
  shape: string[],
  color: string[],
  size: string[]
  count: string[],
  year: string[],
}

export interface Filters {
  shape: string[],
  color: string[],
  size: string[]
}

export interface FiltersRange {
  count: string[],
  year: string[],
}

export const filtersObj: Filters = {
  shape: [],
  color: [],
  size: []
}

export const filtersRangeObj: FiltersRange = {
  count: [],
  year: [],
}

export const defaultFilters = {
    shape: ([] as string[]),
    color: ([] as string[]),
    size: ([] as string[]),
    count: ([] as string[]),
    year: ([] as string[]),
}

export default class MainToysContainer extends Control {
  cardContainer!: CardContainer;
  controls: Controls;
  selectValue: SortSelect;
  isFilter: boolean = false
  isRange: boolean = false
  isRangeYear: boolean = false
  isDeskByName: boolean | undefined;
  isDeskByCount!: boolean | undefined
  sortedArr: IToysModel[] = []
  data: IToysModel[];
  filterValue!: IToysModel[];
  filterValueSet: Set<IToysModel[]>;
  storageFilter: StorageFilter;
  colorFilterArr: string[] = [];
  sizeFilterArr: string[] = [];
  shapeFilterArr: string[] = [];
  countFilterArr: string[] = [];
  yearFilterArr: string[] = [];
  sorted!: IToysModel[];

  constructor(parentNode: HTMLElement, data: IToysModel[]) {
    super(parentNode, 'div', 'main-container', '');
    this.data = data
    this.filterValueSet = new Set()
    this.controls = new Controls(this.node)
    this.selectValue = this.controls.sort.sortSelect
    this.cardContainer = new CardContainer(this.node, this.data)
    this.storageFilter = new StorageFilter() 
    console.log(StorageFilter.loadFromLocalStorage())
    this.rangeHandler(this.data)
    this.filterHandler(this.data)
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
      this.favoriteSort(FAVORITE_FILTER, check, data)
    } 
    //this.isFilter = true
  }

  applyFilter(data: IToysModel[]) {
      defaultFilters.shape = this.shapeFilterArr,
      defaultFilters.color = this.colorFilterArr,
      defaultFilters.size = this.sizeFilterArr
    //defaultFilters.filters = filtersObj
    StorageFilter.setData(defaultFilters)
    this.getFilterData(defaultFilters, data)
    this.data = this.getFilterData(defaultFilters, data)
    this.cardContainer.destroy()
    this.cardContainer = new CardContainer(this.node, this.data)
    return this.data
  }

  getFilterData(defaultFilters: Filters, data: IToysModel[]) {
    return data.filter(item => {
      return Object.keys(defaultFilters).every(propertyName => {
        //console.log(typeof(propertyName))
        if(defaultFilters[propertyName].length === 0) {
          return data
        } 
        if(propertyName === 'count' || propertyName === 'year') {
          console.log('ok')
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

  favoriteSort(filter: { property: string; value: any }, param: string, data: IToysModel[]) {
    this.filterValue = FilterService.sort(filter, param, this.data)
    this.cardContainer.destroy()
    this.cardContainer = new CardContainer(this.node, this.filterValue)
  }

  selectName(): IDesk {
    if(this.selectValue.node.value === 'sort-name-max') {
      this.isDeskByName = true
      this.isDeskByCount = undefined
    } 
    if(this.selectValue.node.value === 'sort-name-min')  {
      this.isDeskByName = false
      this.isDeskByCount = undefined
    }
    if(this.selectValue.node.value === 'sort-count-max')  {
      this.isDeskByCount = true
      this.isDeskByName = undefined
    }
    if(this.selectValue.node.value === 'sort-count-min')  {
      this.isDeskByCount = false
      this.isDeskByName = undefined
    }
    let desk: IDesk = {
      isDeskName: this.isDeskByName,
      isDeskCount:  this.isDeskByCount,
      select: this.selectValue.node.value
    }
    return desk
  }

  rangeHandler(data) {
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
      this.sortCard()
    }  
  }

  applyRangeFilter(data: IToysModel[]) {
      defaultFilters.count = this.countFilterArr,
      defaultFilters.year = this.yearFilterArr
  
   // defaultFilters.filtersRange = filtersRangeObj
    StorageFilter.setData(defaultFilters)
    this.getFilterData(defaultFilters, data)
    this.data = this.getFilterData(defaultFilters, data)
    console.log('range', this.data)
    this.cardContainer.destroy()
    this.cardContainer = new CardContainer(this.node, this.data)
    return this.data
  }

  rangeSort(filtersRangeObj, data) {
    let val = RangeFilterService.rangeSort(filtersRangeObj, data)
    console.log('sort', this.data)
    this.data = val
    this.cardContainer.destroy()
    this.cardContainer = new CardContainer(this.node, this.data)
    return this.data
  }

  sortCard() {
    this.sorted = SortServiceImplementaition.transformByName(this.data, this.selectName()!)
    this.data = this.sorted
    this.cardContainer.destroy()
    this.cardContainer = new CardContainer(this.node, this.data)
  }
}