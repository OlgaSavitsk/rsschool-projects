import Control from "@/common/control";
import { garlandBtns } from "./garland-btns";

export default class GarlandButton extends Control {
    constructor(parentNode: HTMLElement, bgColor: string) {
      super(parentNode, 'div', 'color-btn', '');
      this.node.style.background = `${bgColor}`;
  }
}