import Control from '../../../common/control';

export default class ColorButton extends Control {

  constructor(parentNode: HTMLElement, color: string) {
    super(parentNode, 'button', '', '');
    this.setColorButton(color)
  }

   setColorButton(color: string) {
        this.node.style.backgroundColor = `${color}`;
        return this.node;
    };
}