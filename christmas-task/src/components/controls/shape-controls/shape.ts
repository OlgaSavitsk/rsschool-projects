import { SHAPE_FILTER } from '@/common/constants/filter-constants';
import Control from '@/common/control';
import { IDefaultFilters } from '@/models/default-filter-model';
import ShapeButton from './shape-button';

export default class Shape extends Control {
  onFilter!: (shape: string) => void;

  isChecked: boolean = false;

  filterStorage: IDefaultFilters;

  constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'shape', 'Форма :');
    this.filterStorage = filterStorage;
    this.renderShape();
  }

  public renderShape(): void {
    const forms = Object.keys(SHAPE_FILTER.value).map((name) => name);
    forms.map((shape) => {
      const shapeButton = new ShapeButton(this.node, shape);
      if (this.filterStorage.shape.includes(SHAPE_FILTER.value[shape])) {
        shapeButton.node.classList.add('select');
      } else {
        shapeButton.node.classList.remove('select');
      }
      shapeButton.node.onclick = () => {
        this.onFilter(shape);
        this.isChecked = !this.isChecked;
        shapeButton.node.classList.toggle('select');
      };
    });
  }
}
