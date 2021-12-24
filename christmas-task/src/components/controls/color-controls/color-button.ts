import Control from '../../../common/control';

export default class ColorButton extends Control {
  constructor(parentNode: HTMLElement, color: string) {
    super(parentNode, 'button', '', '');
    this.setColorButton(color);
  }

  public setColorButton(color: string): HTMLElement {
    this.node.style.backgroundColor = `${color}`;
    this.node.setAttribute('data-filter', `${color}`);
    return this.node;
  }
}
