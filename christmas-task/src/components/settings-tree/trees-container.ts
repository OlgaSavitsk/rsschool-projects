import Control from "@/common/control";
import TreeCard from "./tree-card";

type TreeCardBg = string[]

const treeCardBg = <TreeCardBg> ['1', '2', '3', '4', '5', '6']

export default class TreesContainer extends Control {
    treesCard!: Control<HTMLElement>;
  
    constructor(parentNode: HTMLElement) {
      super(parentNode, 'div', 'tree-container menu-container', '');
      this.renderCard()
    }

    public renderCard(): void {

        treeCardBg.map((num: string) => {
            this.treesCard = new TreeCard(this.node, num)
        });
      }
}