import Control from '../../../common/control';

export default class ColorButton extends Control {
  isChecked: boolean = false;

  constructor(parentNode: HTMLElement, color: string) {
    super(parentNode, 'button', '', '');
    this.setColorButton(color)
  }

  setColorButton(color: string) {
      this.node.style.backgroundColor = `${color}`;
      this.node.setAttribute('data-filter', `${color}`)
      return this.node;
  };
}