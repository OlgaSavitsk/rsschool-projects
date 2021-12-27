import Control from "@/common/control";
import Garland from "../garland/garland";
import Snowflake from "../snowflake/snowflake";

export default class MainTree extends Control {
    public imgOfTree: Control<HTMLImageElement>;
    map: Control<HTMLMapElement>;
    area: Control<HTMLAreaElement>;
    snowflakes: Snowflake;
    garland: Garland;
  
    constructor(parentNode: HTMLElement, num: string, bgNum: string, garlandColor: string) {
      super(parentNode, 'div', 'main-tree-container', '');
      this.node.style.backgroundImage = `url(./assets/bg/${bgNum}.jpg)`;
      this.snowflakes = new Snowflake(this.node)
      this.garland = new Garland(this.node, garlandColor)
      this.map = new Control(this.node, 'map', '', '')
      this.map.node.setAttribute('name', 'image-map')
      this.area = new Control(this.map.node, 'area', '', '')
      this.area.node.setAttribute('coords', '248,1,3,7,-1,379,0,711,257,707,432,707,491,708,498,292,495,4')
      this.area.node.setAttribute('shape', 'poly')
      this.imgOfTree = new Control(this.node, 'img', 'main-tree', '')
      this.imgOfTree.node.setAttribute('src', `./assets/tree/${num}.png`);
      this.node.ondragover = (e) => {
        e.preventDefault()
        } 
        this.imgOfTree.node.ondragend = (e) => {
          this.drop(e)
        }
    }
  
    drop(e) {
      e.preventDefault()
      let draggedId = e.dataTransfer.getData("text")
      let draggedEl = document.getElementById(draggedId);
      this.area.node.append(draggedEl!);
    }
}