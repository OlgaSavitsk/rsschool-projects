import Control from "@/common/control";
import { ILimit } from "@/models/limit";
import { IToysModel } from "@/models/toys-model";
import SlotImage from "./slotImage";

export default class FavoriteCard extends Control {
    favoriteCount!: Control<HTMLElement>;
    slotImage!: SlotImage;
    slotImageArr!: IToysModel[];
    count: number;
  
    constructor(parentNode: HTMLElement, public slotItem: IToysModel, public limit: ILimit) {
      super(parentNode, 'div', 'favorites-card', '');
      this.count = +slotItem.count
      this.favoriteCount = new Control(this.node, 'p', 'favorites-count', `${this.count}`)
      this.rendedSlotImage()
    }

    rendedSlotImage() { 
        this.slotImageArr = new Array(+this.slotItem.count)
        this.slotImageArr.fill(this.slotItem) 
        this.slotImageArr.map((toy: IToysModel, index: number) => {
          this.slotImage = new SlotImage(this.node, toy.num, index, this.limit)  
      })     
    }
}