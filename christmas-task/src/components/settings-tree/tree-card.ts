import Control from "@/common/control";

export default class TreeCard extends Control {

    constructor(parentNode: HTMLElement, public num: string) {
      super(parentNode, 'div', 'tree-item', '');
      this.node.style.backgroundImage = `url(./assets/tree/${num}.png)`;
      //this.node.setAttribute('data-filter', `${shapeImage}`);
    }
  }