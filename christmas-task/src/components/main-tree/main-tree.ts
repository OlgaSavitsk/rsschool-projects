import Control from "@/common/control";
import Garland from "../garland/garland";
import { Multicolor } from "../settings-tree/garland-btns";
import Snowflake from "../snowflake/snowflake";

export default class MainTree extends Control {
    public imgOfTree: Control<HTMLImageElement>;
    map: Control<HTMLMapElement>;
    area: Control<HTMLAreaElement>;
    snowflakes: Snowflake;
    garland: Garland;
  
    constructor(parentNode: HTMLElement, num: string, bgNum: string, garlandColor: string, multicolor: Multicolor) {
      super(parentNode, 'div', 'main-tree-container', '');
      this.node.style.backgroundImage = `url(./assets/bg/${bgNum}.jpg)`;
      this.snowflakes = new Snowflake(this.node)
      this.garland = new Garland(this.node, garlandColor, multicolor)
      this.map = new Control(this.node, 'map', '', '')
      this.map.node.setAttribute('name', 'image-map')
      this.area = new Control(this.map.node, 'area', '', '')
      this.area.node.setAttribute('coords', '243,6,163,123,102,202,68,264,32,318,39,354,49,376,42,402,15,449,5,523,-1,566,43,654,95,700,267,713,485,684,496,553,459,357,412,218,359,129,298,30,260,3')
      this.area.node.setAttribute('shape', 'poly')
      this.imgOfTree = new Control(this.node, 'img', 'main-tree', '')
      this.imgOfTree.node.setAttribute('src', `./assets/tree/${num}.png`);
    }

    onDragOver(event) {
      event.preventDefault();
    }
  
    drop(e) {
      let draggedId = e.dataTransfer.getData("text")
      let draggedEl = document.getElementById(draggedId);
      this.area.node.append(draggedEl!);
      e.dataTransfer.clearData();
    }
}