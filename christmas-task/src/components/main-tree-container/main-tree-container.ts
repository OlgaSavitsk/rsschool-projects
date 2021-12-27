import Control from "@/common/control";
import { ILimit } from "@/models/limit";
import { IToysModel } from "@/models/toys-model";
import FavoriteBlock from "../favorite/favoriteBlock";
import MainTree from "../main-tree/main-tree";
import { Multicolor } from "../settings-tree/garland-btns";
import SettingsControl from "../settings-tree/settings";

export default class MainTreeContainer extends Control {
    settingsControl: SettingsControl;
    mainBlock!: MainTree;
    favorite: FavoriteBlock;
    garlandColor!: string
  
    constructor(parentNode: HTMLElement, public favoriteCount: string[], public data: IToysModel[], num: string, bgNum: string, garlandColor: string, multicolor: Multicolor) {
      super(parentNode, 'div', 'main-container', '');
      this.settingsControl = new SettingsControl(this.node);
      this.mainBlock = new MainTree(this.node, num, bgNum, garlandColor, multicolor);
      this.favorite = new FavoriteBlock(this.node, favoriteCount, data, this.getMainTreeSize());
     this.mainBlock.imgOfTree.node.ondragover = (e) => {
       e.preventDefault()
       this.favorite.favoriteSlot.slotImage.moveAt(e)
     }
    }

   getMainTreeSize() {
      const limit = <ILimit> {
        left: this.mainBlock.imgOfTree.node.getBoundingClientRect().left - this.mainBlock.imgOfTree.node.offsetWidth/2,
        top: this.mainBlock.imgOfTree.node.getBoundingClientRect().top,
        right: this.mainBlock.imgOfTree.node.getBoundingClientRect().right - this.mainBlock.imgOfTree.node.offsetWidth/2,
        bottom: this.mainBlock.imgOfTree.node.getBoundingClientRect().bottom
      };  
     return limit
    } 

}