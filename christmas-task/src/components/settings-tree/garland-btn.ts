import Control from "@/common/control";

export default class GarlandButton extends Control {
    constructor(parentNode: HTMLElement, bgColor: string) {
      super(parentNode, 'div', 'color-btn', '');
      this.node.style.background = `${bgColor}`;
      //this.node.setAttribute('data-filter', `${shapeImage}`);
    }
  }