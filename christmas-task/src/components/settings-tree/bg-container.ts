import Control from "@/common/control";
import BgCard from "./bg-card";

type CardBg = string[]

const cardBg = <CardBg> ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

export default class BgContainer extends Control {
    bgCard!: Control<HTMLElement>;
  
    constructor(parentNode: HTMLElement) {
      super(parentNode, 'div', 'bg-container menu-container', '');
      this.renderCard()
    }

    public renderCard(): void {
        cardBg.map((num: string) => {
            this.bgCard = new BgCard(this.node, num)
        });
      }
}