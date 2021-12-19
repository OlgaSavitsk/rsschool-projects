import { SHAPE_FILTER } from '../../../common/constants/filter-constants';
import Control from '../../../common/control';
import ShapeButton from './shape-button';

export default class Shape extends Control {
  onFilter!: (shape: string) => void
  isChecked: boolean = false;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'shape', 'Форма :');
    this.renderShape() 
  }

  renderShape() {
    const forms = Object.keys(SHAPE_FILTER.value).map((name) => name);
    forms.map((shape) => {
        const shapeButton = new ShapeButton(this.node, shape)  
        shapeButton.node.onclick = () => {
          this.onFilter(shape)         
          this.isChecked = !this.isChecked; 
          shapeButton.node.classList.toggle('select');
        }  
    }); 
  }
}