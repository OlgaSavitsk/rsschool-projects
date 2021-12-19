import { COLOR_FILTER, FAVORITE_FILTER, SHAPE_FILTER, SIZE_FILTER } from "../../common/constants/filter-constants";
import Control from "../../common/control";
import { FilterService } from "../../common/services/filter.service";
import SortServiceImplementaition from "../../common/services/sort.service";
import SortService from "../../common/services/sort.service";
import { ToysDataModel } from "../../models/toys-data-model";
import { IDesk, IToysModel } from "../../models/toys-model";
import CardContainer from "../card-container/card-container";
import Controls from "../controls/controls";
import SortSelect from "../controls/sort-select";

export default class MainToysContainer extends Control {
  cardContainer!: CardContainer;
  controls: Controls;
  sortService!: SortService
  selectValue: SortSelect;
  isSorted: boolean = false
  isRangeCount: boolean = false
  isRangeYear: boolean = false
  isDeskByName: boolean | undefined;
  isDeskByCount!: boolean | undefined
  model: ToysDataModel;
  sortedArr: IToysModel[] = []
  data: IToysModel[];
  filterValue!: IToysModel[];
  params: string[] = []
  filterData!: IToysModel[]
  filterValueArr: IToysModel[] = []
  filterValueSet: Set<IToysModel[]>;

  constructor(parentNode: HTMLElement, data: IToysModel[]) {
    super(parentNode, 'div', 'main-container', '');
    this.data = data
    this.filterValueSet = new Set()
    this.controls = new Controls(this.node)
    this.selectValue = this.controls.sort.sortSelect
    this.model = new ToysDataModel()
    this.rangeHandler(this.data)
    this.filterHandler(this.data)
  }

  filterHandler(data) {
    this.controls.filter.shapes.onFilter = (shape) => {  
      this.toggleFilter(SHAPE_FILTER, shape, data)
    } 
    this.controls.filter.colors.onFilter = (color) => { 
      this.toggleFilter(COLOR_FILTER, color, data)
    }
    this.controls.filter.sizes.onFilter = (size) => { 
      this.toggleFilter(SIZE_FILTER, size, data)
    }
    this.controls.filter.favorite.form.onFilter = (check) => { 
      this.favoriteSort(FAVORITE_FILTER, check, data)
    }
  }

  setFilterValue(data: IToysModel[]) {
     this.filterValueArr = []
     this.filterValue = data.filter((item, index) => {
        for(let i = index+1; i<data.length; i++ ){
          if(data[i].num === item.num) {
          this.filterValueArr.push(data[i])
           return true; 
          }
        }
        return false;   
      });
      this.filterValue = this.filterValueArr.flat() 
      if(this.filterValue.length === 0) {
        this.filterValue = data
      } 
      this.cardContainer.destroy()
      this.cardContainer = new CardContainer(this.node, this.filterValue)
  }
//при повторном клике на фильр, копии игрушек удаляются
// и при обратном включении уже не фильтруются(при условии включенного фильтра из другой категории)
  toggleFilter(filter: { property: string; value: any }, param: string, data: IToysModel[]) {
    this.filterValue = FilterService.sort(filter, param, data)
  
    if(this.params.includes(param)) { 
      this.params = this.params.filter(item => item !== param)
      for(let i of this.filterValue) { 
        this.filterData = this.filterData.filter((item => item.num !== i.num))
        this.filterValueSet.clear()
        this.filterValueSet.add(this.filterData) 
      } 
    } else {
      this.params.push(param) 
      this.filterValueSet.add(this.filterValue)
      this.filterData = Array.from(this.filterValueSet).flat() 
    }
    this.setFilterValue(this.filterData)
  }

  favoriteSort(filter: { property: string; value: any }, param: string, data: IToysModel[]) {
    this.filterValue = FilterService.sort(filter, param, data)
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
      isDeskCount:  this.isDeskByCount
    }
    return desk
  }

  rangeHandler(data: IToysModel[]) {
    this.cardContainer = new CardContainer(this.node, data)
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
      this.setSortCard(data)
    }  
  }

  setSortCard(data: IToysModel[]) {
    if(this.isRangeCount === true || this.isRangeYear === true || this.isSorted === true) {
      const sortedArrCount = this.controls.range.countValue.countSlider.rangeSortByCount(data)
      const sortedArrYear = this.controls.range.yearValue.yearSlider.rangeSortByYear(data)
      sortedArrYear.map((item: IToysModel) => {
        if(sortedArrCount.includes(item)) {
          this.sortedArr.push(item) 
        }
      })
    }
    if(this.sortedArr.length < this.data.length && this.isSorted === true) {
      this.sortedArr = SortServiceImplementaition.transformByName(this.sortedArr, this.selectName()!)
    } else if(this.isSorted === true) {
      this.sortedArr = SortServiceImplementaition.transformByName(data, this.selectName()!)
    }
    this.cardContainer = new CardContainer(this.node, this.sortedArr)
    this.sortedArr!.splice(0, this.sortedArr!.length) 
  } 
}