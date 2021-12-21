import { SIZE_FILTER } from '../../../common/constants/filter-constants';
import Control from '../../../common/control';
import { IDefaultFilters } from '../../main-toys-container/main-toys-container';
import SizeButton from './size-button';

export default class Size extends Control {
  onFilter!: (color: string) => void
  isChecked: boolean = false;
  scale: number;
  filterStorage: IDefaultFilters;

  constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'size', 'Размер :');
    this.filterStorage = filterStorage
    this.scale = 1.5
    this.renderSizeButton()
  }

  renderSizeButton() {
    const colors = Object.keys(SIZE_FILTER.value);
    colors.map((size) => {
      const sizeButton = new SizeButton(this.node, size)
      if(this.filterStorage.size.includes(SIZE_FILTER.value[size])) {
        sizeButton.node.classList.add('select');
      } else {
        sizeButton.node.classList.remove('select')
      } 
      sizeButton.node.style.transform = `scale(${this.scale -= 0.3})`
      sizeButton.node.onclick = () => {
        this.onFilter(size)         
        this.isChecked = !this.isChecked; 
        sizeButton.node.classList.toggle('select');
      }    
    }); 
  }
}