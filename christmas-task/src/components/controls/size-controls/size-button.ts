import Control from '../../../common/control';

export default class SizeButton extends Control {
  isChecked: boolean = false;

  constructor(parentNode: HTMLElement, size: string) {
    super(parentNode, 'button', '', '');
    this.setSizeButton(size)
    this.node.onclick = () => {
      this.node.classList.add('select');
      this.isChecked = !this.isChecked;
      if (!this.isChecked) {
        this.node.classList.remove('select');
      }
    }
  }

   setSizeButton(size: string) {
        this.node.style.backgroundSize = `${size}`;
        return this.node;
    };
}