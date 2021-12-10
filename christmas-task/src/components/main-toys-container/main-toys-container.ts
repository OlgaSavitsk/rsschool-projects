import Control from "../../common/control";
import CardContainer from "../card-container/card-container";
import Controls from "../controls/controls";

export default class MainToysContainer extends Control {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'main-container', '');
    const controls = new Controls(this.node)
    const cardContainer = new CardContainer(this.node)
  }
}