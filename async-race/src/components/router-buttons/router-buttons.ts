import Control from '@/common/components/control';

export default class RouterButtons extends Control {
  public onToggleToPage!: () => void;
  public buttonToGarage: Control<HTMLButtonElement>;
  buttonToWinner: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'router-container', '');
    this.buttonToGarage = new Control(this.node, 'button', 'button menu-button', '')
    this.buttonToWinner = new Control(this.node, 'button', 'button menu-button', '')
    this.buttonToGarage.node.innerHTML = `<a href="#garage">TO GARAGE</a>`
    this.buttonToWinner.node.innerHTML = `<a href="#winner">TO WINNER</a>`
    this.buttonToGarage.node.onclick = () => {
      this.onToggleToPage();
    };
    this.buttonToWinner.node.onclick = () => {
      this.onToggleToPage();
    };
  }
}
