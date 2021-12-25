import Control from "@/common/control";

export default class MainTree extends Control {
    imgOfTree: Control<HTMLImageElement>;
  
    constructor(parentNode: HTMLElement) {
      super(parentNode, 'div', 'main-tree-container', '');
      this.node.style.backgroundImage = `url(./assets/bg/${1}.jpg)`;
      this.imgOfTree = new Control(this.node, 'img', 'main-tree', '')
      this.imgOfTree.node.setAttribute('src', `./assets/tree/${1}.png`);
    }
}