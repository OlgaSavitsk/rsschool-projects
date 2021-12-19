import { SIZE_FILTER } from '../../../common/constants/filter-constants';
import Control from '../../../common/control';
import SizeButton from './size-button';

export default class Size extends Control {
  onFilter!: (color: string) => void
  isChecked: boolean = false;
  scale: number;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'size', 'Размер :');
    this.scale = 1.5
      this.renderSizeButton()
  }

  renderSizeButton() {
    const colors = Object.keys(SIZE_FILTER.value);
    colors.map((size) => {
      const sizeButton = new SizeButton(this.node, size)
      sizeButton.node.style.transform = `scale(${this.scale -= 0.3})`
      sizeButton.node.onclick = () => {
        this.onFilter(size)         
        this.isChecked = !this.isChecked; 
        sizeButton.node.classList.toggle('select');
      }    
    }); 
  }
}