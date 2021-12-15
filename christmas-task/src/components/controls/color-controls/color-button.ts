import Control from '../../../common/control';

export default class ColorButton extends Control {
  isChecked: boolean = false;

  constructor(parentNode: HTMLElement, color: string) {
    super(parentNode, 'button', '', '');
    this.setColorButton(color)
    this.node.onclick = () => {
      this.node.classList.add('active');
      this.isChecked = !this.isChecked;
      if (!this.isChecked) {
        this.node.classList.remove('active');
      }
    }
  }

   setColorButton(color: string) {
        this.node.style.backgroundColor = `${color}`;
        return this.node;
    };
}