import Control from "@/common/components/control";

export default class BgTree extends Control {
  
    constructor(parentNode: HTMLElement, bgNum: string) {
      super(parentNode, 'div', 'bg-tree', '');
      this.node.style.backgroundImage = `url(./assets/bg/${bgNum}.jpg)`;
    }
}