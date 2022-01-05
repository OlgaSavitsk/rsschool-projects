import Control from '@/common/components/control';
import BgCard from './bg-card';

type CardBg = string[];

const cardBg = <CardBg> ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

export default class BgContainer extends Control {
  bgCard!: Control<HTMLElement>;

  onChangeTree: ((num: string) => void) | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'bg-container menu-container', '');
    this.renderCard();
  }

  public renderCard(): void {
    cardBg.map((num: string) => {
      this.bgCard = new BgCard(this.node, num);
      this.bgCard.node.onclick = () => {
        if (this.onChangeTree) {
          this.onChangeTree(num);
        }
      };
      return false;
    });
  }
}
