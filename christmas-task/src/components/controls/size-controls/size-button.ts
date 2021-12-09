import Control from '../../../common/control';

export default class SizeButton extends Control {

  constructor(parentNode: HTMLElement, size: string) {
    super(parentNode, 'button', '', '');
    this.setSizeButton(size)
  }

   setSizeButton(size: string) {
        this.node.style.backgroundSize = `${size}`;
        return this.node;
    };
}