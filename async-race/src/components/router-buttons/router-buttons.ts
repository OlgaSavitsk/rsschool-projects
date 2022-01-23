import Control from '@/common/components/control';

export default class RouterButtons extends Control {
  private buttonToGarage: Control<HTMLButtonElement>;

  private buttonToWinner: Control<HTMLButtonElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'router-container', '');
    this.buttonToGarage = new Control(this.node, 'button', 'button menu-button', '');
    this.buttonToWinner = new Control(this.node, 'button', 'button menu-button', '');
    this.buttonToGarage.node.innerHTML = '<a href="#garage">TO GARAGE</a>';
    this.buttonToWinner.node.innerHTML = '<a href="#winner">TO WINNER</a>';
  }
}
