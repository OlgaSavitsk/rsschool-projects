import Control from "../../common/control";
import Card from "../card-container/card";
import CardContainer from "../card-container/card-container";
import Controls from "../controls/controls";

export default class MainToysContainer extends Control {
  cardContainer!: CardContainer;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'main-container', '');
    const controls = new Controls(this.node)
    this.cardContainer = new CardContainer(this.node)
  }
}