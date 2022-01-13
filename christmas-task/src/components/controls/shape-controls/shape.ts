import Control from '@/common/components/control';
import { SHAPE_FILTER } from '@/common/constants/filter-constants';
import { IDefaultFilters } from '@/models/default-filter-model';
import ShapeButton from './shape-button';

export default class Shape extends Control {
  public onFilter!: (shape: string) => void;

  public isChecked: boolean = false;

  constructor(parentNode: HTMLElement, public filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'shape', 'Форма :');
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
      this.setEventListener(shapeButton, shape);
      return false;
    });
  }

  private setEventListener(shapeButton: ShapeButton, shape: string): void {
    shapeButton.node.onclick = () => {
      this.onFilter(shape);
      this.isChecked = !this.isChecked;
      shapeButton.node.classList.toggle('select');
    };
  }
}
