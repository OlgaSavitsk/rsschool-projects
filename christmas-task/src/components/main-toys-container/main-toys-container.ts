import Control from "../../common/control";
import SortServiceImplementaition from "../../common/services/sort.service";
import SortService from "../../common/services/sort.service";
import { ToysDataModel } from "../../models/toys-data-model";
import { IDesk, IToysModel } from "../../models/toys-model";
import CardContainer from "../card-container/card-container";
import Controls from "../controls/controls";

export default class MainToysContainer extends Control {
  cardContainer!: CardContainer;
  controls: Controls;
  sortService!: SortService
  selectValue: any;
  isSorted: boolean = false
  isRangeCount: boolean = false
  isRangeYear: boolean = false
  isDeskByName: boolean | undefined;
  isDeskByCount!: boolean | undefined
  desk!: IDesk
  model: ToysDataModel;
  sortedArr: IToysModel[] = []
  data: IToysModel[];

  constructor(parentNode: HTMLElement, data: IToysModel[]) {
    super(parentNode, 'div', 'main-container', '');
    this.data = data
    this.controls = new Controls(this.node, data)
    this.selectValue = this.controls.sort.sortSelect
    this.cardContainer = new CardContainer(this.node, data)
    this.sortService = new SortServiceImplementaition()
    this.model = new ToysDataModel()
    this.selectValue.onChange = () => {
      this.isSorted = true  
      this.updateValue()
    }
    this.controls.range.countValue.countSlider.onChange = () => {
      this.isRangeCount = true
      this.updateValue()
    }
    this.controls.range.yearValue.yearSlider.onChange = () => {
      this.isRangeYear = true
      this.updateValue()
    }
  }

  updateValue() {
    this.cardContainer.destroy()
    this.filterCard(this.data)
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

  filterCard(data: IToysModel[]) {
    let sortedArrCount;
    let sortedArrYear 
    if(this.isRangeCount === true || this.isRangeYear === true || this.isSorted === true) {
      sortedArrCount = this.controls.range.countValue.countSlider.rangeSortByCount(data)
      sortedArrYear = this.controls.range.yearValue.yearSlider.rangeSortByYear(data)
      sortedArrYear.map(item => {
        if(sortedArrCount.includes(item)) {
          this.sortedArr.push(item) 
        }
      })
    }
    if(this.sortedArr.length < this.data.length && this.isSorted === true) {
      this.sortedArr = SortServiceImplementaition.transformByName(this.sortedArr, this.selectName()!)
    } else  if(this.isSorted === true) {
      this.sortedArr = SortServiceImplementaition.transformByName(data, this.selectName()!)
    } 
    this.cardContainer = new CardContainer(this.node, this.sortedArr)
    this.sortedArr!.splice(0, this.sortedArr!.length)
  } 
}