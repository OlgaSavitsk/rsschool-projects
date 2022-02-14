import Control from '@/common/components/control';
import { treeCardBg } from '@/common/constants/constants';
import TreeCard from './tree-card';

export default class TreesContainer extends Control {
  public treesCard!: Control<HTMLElement>;

  public onChangeTree: ((num: string) => void) | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'tree-container menu-container', '');
    this.renderCard();
  }

  public renderCard(): void {
    treeCardBg.map((num: string) => {
      this.treesCard = new TreeCard(this.node, num);
      this.setEventListener(num);
      return false;
    });
  }

  private setEventListener(num: string): void {
    this.treesCard.node.onclick = () => {
      if (this.onChangeTree) {
        this.onChangeTree(num);
      }
    };
  }
}
