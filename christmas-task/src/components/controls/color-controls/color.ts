import { COLOR_FILTER } from '../../../common/constants/filter-constants';
import Control from '../../../common/control';
import ColorButton from './color-button';

export class Color extends Control {
  onFilter!: (color: string) => void
  isChecked: boolean = false;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'color', 'Цвет :');
      this.renderColor()
  }

  renderColor() {
    const colors = Object.keys(COLOR_FILTER.value);
    colors.map((color) => {
      const colorButton = new ColorButton(this.node, color)
      colorButton.node.onclick = () => {
        this.onFilter(color)         
        this.isChecked = !this.isChecked; 
        colorButton.node.classList.toggle('active');
      }    
    }); 
  }
}