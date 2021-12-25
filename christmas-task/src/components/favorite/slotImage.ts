import Control from "@/common/control";
import { IToysModel } from "@/models/toys-model";

export default class SlotImage extends Control {
  
    constructor(parentNode: HTMLElement, public num: string) {
      super(parentNode, 'img', 'favorites-card-img', '');
      this.node.setAttribute('src', `./toys/${num}.png`)
    }
}