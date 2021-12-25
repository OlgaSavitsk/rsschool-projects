import Control from "@/common/control";
import { IToysModel } from "@/models/toys-model";
import FavoriteCard from "./favorite-card";

export default class FavoriteBlock extends Control {
    favoriteContainer: Control<HTMLElement>;
    favorite!: Control<HTMLElement>;
    favoriteSlot!: FavoriteCard;
  
    constructor(parentNode: HTMLElement, public favoriteCount: string[], public data: IToysModel[]) {
      super(parentNode, 'div', 'favorites-aside', '');
      this.favoriteContainer = new Control(this.node, 'div', 'favorites-container', '')
      this.renderSlot()
    }

    renderSlot() {
      let toys = Object.values(this.data).find(item => item)
      console.log(toys)
      this.favoriteCount.map((slot: string) => {
        let slotCount = Object.values<IToysModel>(this.data).find((item: IToysModel) => item.num === slot)
        if(slotCount) {
          this.favoriteSlot = new FavoriteCard(this.favoriteContainer.node, slot, this.data, slotCount.count)
        }
        
      })
    }
}