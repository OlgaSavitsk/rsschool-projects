import Control from "@/common/control";
import { ILimit } from "@/models/limit";
import { IToysModel } from "@/models/toys-model";
import FavoriteCard from "./favorite-card";

export default class FavoriteBlock extends Control {
    favoriteContainer: Control<HTMLElement>;
    favorite!: Control<HTMLElement>;
    favoriteSlot!: FavoriteCard;
  
    constructor(parentNode: HTMLElement, public favoriteCount: string[], public data: IToysModel[], public limit: ILimit) {
      super(parentNode, 'div', 'favorites-aside', '');
      this.favoriteContainer = new Control(this.node, 'div', 'favorites-container', '')
      this.renderSlot()
    }

    renderSlot() {
      this.favoriteCount.map((slot: string) => {
        let slotItem = Object.values<IToysModel>(this.data).find((item: IToysModel) => item.num === slot)
        if(slotItem) {
          this.favoriteSlot = new FavoriteCard(this.favoriteContainer.node, slotItem, this.limit)
        }
      })
      if(this.favoriteCount.length === 0){
        this.data.slice(0, 20).map(item => { 
          this.favoriteSlot = new FavoriteCard(this.favoriteContainer.node, item, this.limit)
        })
      }
    }
}