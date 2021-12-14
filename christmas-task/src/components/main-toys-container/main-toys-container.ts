import Control from "../../common/control";
import SortServiceImplementaition from "../../common/sort-service/sort.service";
import SortService from "../../common/sort-service/sort.service";
import { IDesk, IToysModel } from "../../models/toys-model";
import CardContainer from "../card-container/card-container";
import Controls from "../controls/controls";

export default class MainToysContainer extends Control {
  cardContainer!: CardContainer;
  controls: Controls;
  sortService!: SortService
  selectValue: any;
  isSorted: boolean = false
  isDeskByName: boolean | undefined;
  isDeskByCount!: boolean | undefined
  desk!: IDesk


  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'main-container', '');
    this.controls = new Controls(this.node)
    this.selectValue = this.controls.sort.sortSelect
    this.cardContainer = new CardContainer(this.node, this.getData())
    this.sortService = new SortServiceImplementaition()
    this.selectValue.onChange = () => {
      this.isSorted = true
      this.cardContainer.destroy()
      this.cardContainer.card.node.classList.add('hide')
      this.getValuesArray(this.isSorted)
      this.cardContainer = new CardContainer(this.node, this.getData())
    }
    this.getValuesArray(this.isSorted)
  }

  sortCardByName() {
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

  async getData(): Promise<IToysModel[]> {
    const response = await fetch('toys.json');
    const toys: Array<IToysModel> = await response.json();
    return toys;
  }

  getValuesArray(isSorted: boolean) {
    return this.getData().then(res => {
      if(isSorted === true) {
        const sorted = SortServiceImplementaition.transformByName(res, this.sortCardByName()!)
        this.cardContainer.setToyCards(sorted)
      } else {
        this.cardContainer.setToyCards(res)
      }
     
    });
  } 
}