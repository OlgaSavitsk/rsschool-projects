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
      this.area.node.setAttribute('coords', '232,6,89,245,14,424,14,588,83,668,226,707,402,687,494,575,469,445,418,226,299,39,266,2,489,0,493,244,495,461,495,607,492,709,379,711,160,712,3,709,-1,343,3,4')
      this.area.node.setAttribute('shape', 'poly')
      this.imgOfTree = new Control(this.node, 'img', 'main-tree', '')
      this.imgOfTree.node.setAttribute('src', `./assets/tree/${num}.png`);
      this.imgOfTree.node.setAttribute('usemap', '#image-map');
    }
}