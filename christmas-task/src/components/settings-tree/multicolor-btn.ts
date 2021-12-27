import Control from "@/common/control";
import { garlandBtns, Multicolor } from "./garland-btns";

export default class MulticolorButton extends Control {
    onGarlandMulticolorColor!: (bgColor: Multicolor) => void

    constructor(parentNode: HTMLElement) {
      super(parentNode, 'div', 'color-btn', '');
        this.node.style.background = `${garlandBtns.multicolor.multi}`;
        this.node.onclick = () => {
          this.onGarlandMulticolorColor(garlandBtns.multicolor)
        }
    }
  }