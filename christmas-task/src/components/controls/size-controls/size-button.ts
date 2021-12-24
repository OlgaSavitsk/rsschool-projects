import Control from '../../../common/control';

export default class SizeButton extends Control {
  constructor(parentNode: HTMLElement, size: string) {
    super(parentNode, 'button', '', '');
    this.node.setAttribute('data-filter', `${size}`);
  }
}
