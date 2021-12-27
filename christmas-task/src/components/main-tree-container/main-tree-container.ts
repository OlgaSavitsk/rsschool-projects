import Control from "@/common/control";
import { ILimit } from "@/models/limit";
import { IToysModel } from "@/models/toys-model";
import FavoriteBlock from "../favorite/favoriteBlock";
import MainTree from "../main-tree/main-tree";
import SettingsControl from "../settings-tree/settings";

export default class MainTreeContainer extends Control {
    settingsControl: SettingsControl;
    mainBlock!: MainTree;
    favorite: FavoriteBlock;
  
    constructor(parentNode: HTMLElement, public favoriteCount: string[], public data: IToysModel[], num: string, bgNum: string, garlandColor: string) {
      super(parentNode, 'div', 'main-container', '');
      this.settingsControl = new SettingsControl(this.node);
      this.mainBlock = new MainTree(this.node, num, bgNum, garlandColor);
      this.favorite = new FavoriteBlock(this.node, favoriteCount, data, this.getMainTreeSize());
      this.settingsControl.garlandContainer.switchButton.onChecked = (isChecked) => {
        console.log(isChecked)
        if(isChecked === true) {
          this.mainBlock.garland.node.classList.remove('hide')
        } else {
          this.mainBlock.garland.node.classList.add('hide')
        }
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