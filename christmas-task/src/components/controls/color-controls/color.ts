import { COLOR_FILTER } from '../../../common/constants/filter-constants';
import Control from '../../../common/control';
import { IDefaultFilters } from '../../../models/default-filter-model';
import ColorButton from './color-button';

export class Color extends Control {
  onFilter!: (color: string) => void
  isChecked: boolean = false;
  filterStorage: IDefaultFilters;

  constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'color', 'Цвет :');
    this.filterStorage = filterStorage
    this.renderColor()
  }

  private renderColor(): void {
    const colors = Object.keys(COLOR_FILTER.value);
    colors.map((color) => {
      const colorButton = new ColorButton(this.node, color)
      if(this.filterStorage.color.includes(COLOR_FILTER.value[color])) {
        colorButton.node.classList.add('active');
      }  else {
        colorButton.node.classList.remove('active')
      } 
      colorButton.node.onclick = () => {
        this.onFilter(color)         
        this.isChecked = !this.isChecked; 
        colorButton.node.classList.toggle('active');
      }    
    }); 
  }
}