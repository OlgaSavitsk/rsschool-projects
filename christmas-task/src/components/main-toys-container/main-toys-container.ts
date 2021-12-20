import { COLOR_FILTER, FAVORITE_FILTER, SHAPE_FILTER, SIZE_FILTER } from "../../common/constants/filter-constants";
import Control from "../../common/control";
import { FilterService } from "../../common/services/filter.service";
import SortServiceImplementaition from "../../common/services/sort.service";
import { StorageFilter } from "../../common/services/storage";
import { ToysDataModel } from "../../models/toys-data-model";
import { IDesk, IToysModel } from "../../models/toys-model";
import CardContainer from "../card-container/card-container";
import Controls from "../controls/controls";
import SortSelect from "../controls/sort-select";

interface Filters {
  shape: string[],
  color: string[],
  size: string[]
}

const filtersOb: Filters = {
  shape: [],
  color: [],
  size: []
}

export default class MainToysContainer extends Control {
  cardContainer!: CardContainer;
  controls: Controls;
  selectValue: SortSelect;
  isSorted: boolean = false
  isRangeCount: boolean = false
  isRangeYear: boolean = false
  isDeskByName: boolean | undefined;
  isDeskByCount!: boolean | undefined
  //model: ToysDataModel;
  sortedArr: IToysModel[] = []
  data: IToysModel[];
  filterValue!: IToysModel[];
  filterValueSet: Set<IToysModel[]>;
  storageFilter: StorageFilter;
  colorFilterArr: string[] = [];
  sizeFilterArr: string[] = [];
  shapeFilterArr: string[] = [];

  constructor(parentNode: HTMLElement, data: IToysModel[]) {
    super(parentNode, 'div', 'main-container', '');
    this.data = data
    this.filterValueSet = new Set()
    this.controls = new Controls(this.node)
    this.selectValue = this.controls.sort.sortSelect
    this.cardContainer = new CardContainer(this.node, data)
    this.storageFilter = new StorageFilter()
    
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
  }

  applyFilter(data: IToysModel[]) {
    const filtersOb: Filters = {
      shape: this.shapeFilterArr,
      color: this.colorFilterArr,
      size: this.sizeFilterArr
    }
    this.getFilterData(filtersOb, data)
    this.data = this.getFilterData(filtersOb, data)
    this.cardContainer.destroy()
    this.cardContainer = new CardContainer(this.node, this.data)
    console.log(this.data)
    return this.data
  }

  getFilterData(filtersOb: Filters, data: IToysModel[]) {
    return data.filter(row => {
      return Object.keys(filtersOb).every(propertyName => {
        if(filtersOb[propertyName].length === 0) {
          return data
        }
        //console.log(filtersOb[propertyName], row[propertyName])
        if(filtersOb[propertyName].length > 1) {
          return filtersOb[propertyName].includes(row[propertyName])
        } else {
          return row[propertyName].indexOf(filtersOb[propertyName]) > -1
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

  rangeHandler(data: IToysModel[]) {
    //this.cardContainer = new CardContainer(this.node, data)
    this.controls.range.countValue.countSlider.onChange = () => {
      this.isRangeCount = true
      this.cardContainer.destroy() 
      this.setSortCard(data)
    }
    this.controls.range.yearValue.yearSlider.onChange = () => {
      this.isRangeYear = true
      this.cardContainer.destroy() 
      this.setSortCard(data)
    } 
    this.selectValue.onChange = () => {
      this.isSorted = true  
      this.cardContainer.destroy() 
      this.sortCard(data)
    }  
  }

  setSortCard(data: IToysModel[]) {
    if(this.isRangeCount === true || this.isRangeYear === true) {
      const sortedArrCount = this.controls.range.countValue.countSlider.rangeSortByCount(data)
      const sortedArrYear = this.controls.range.yearValue.yearSlider.rangeSortByYear(data)
      sortedArrYear.map((item: IToysModel) => {
        if(sortedArrCount.includes(item)) {
          this.sortedArr.push(item) 
        }
      })
    }
    this.data = this.sortedArr
    this.cardContainer.destroy()
    this.cardContainer = new CardContainer(this.node, this.data)
    this.sortedArr!.splice(0, this.sortedArr!.length) 
    return this.data
  } 

  sortCard(data: IToysModel[]) {
    this.sortedArr = SortServiceImplementaition.transformByName(this.data, this.selectName()!)
    this.cardContainer.destroy()
    this.cardContainer = new CardContainer(this.node, this.sortedArr)
  }
}