import Control from "@/common/control";
import { garlandBtns, Multicolor } from "./garland-btns";

export default class GarlandButton extends Control {
    constructor(parentNode: HTMLElement, bgColor: string | Multicolor) {
      super(parentNode, 'div', 'color-btn', '');
      this.node.style.background = `${bgColor}`;
  }
}