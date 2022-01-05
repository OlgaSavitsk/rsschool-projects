import Control from '@/common/components/control';
import TreeCard from './tree-card';

type TreeCardBg = string[];

const treeCardBg = <TreeCardBg> ['1', '2', '3', '4', '5', '6'];

export default class TreesContainer extends Control {
  treesCard!: Control<HTMLElement>;

  onChangeTree: ((num: string) => void) | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'tree-container menu-container', '');
    this.renderCard();
  }

  public renderCard(): void {
    treeCardBg.map((num: string) => {
      this.treesCard = new TreeCard(this.node, num);
      this.treesCard.node.onclick = () => {
        if (this.onChangeTree) {
          this.onChangeTree(num);
        }
      };
      return false;
    });
  }
}
