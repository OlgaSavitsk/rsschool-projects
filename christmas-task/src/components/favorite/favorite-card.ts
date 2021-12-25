import Control from "@/common/control";
import { IToysModel } from "@/models/toys-model";
import SlotImage from "./slotImage";

export default class FavoriteCard extends Control {
    favoriteCount!: Control<HTMLElement>;
    slotImage!: SlotImage;
  slotImageArr!: any[];
  
    constructor(parentNode: HTMLElement, public slot: string, public data: IToysModel[], slotCount: string) {
      super(parentNode, 'div', 'favorites-card', '');
      this.favoriteCount = new Control(this.node, 'p', 'favorites-count', `${slotCount}`)
      this.rendedSlotImage()
    }

    rendedSlotImage() {
      this.data.map((toy: IToysModel) => {
        this.slotImageArr = new Array(+toy.count)
        if(this.slot.includes(toy.num)) {
          this.slotImageArr.fill(toy)
        }
        this.slotImageArr.map((toy: IToysModel) => {
          this.slotImage = new SlotImage(this.node, toy.num)
        })
      })
    }
}