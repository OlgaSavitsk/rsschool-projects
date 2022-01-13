import Control from '@/common/components/control';
import { COLOR_FILTER } from '@/common/constants/filter-constants';
import { IDefaultFilters } from '@/models/default-filter-model';
import ColorButton from './color-button';

export default class Color extends Control {
  public onFilter!: (color: string) => void;

  public isChecked: boolean = false;

  constructor(parentNode: HTMLElement, public filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'color', 'Цвет :');
    this.renderColor();
  }

  private renderColor(): void {
    const colors = Object.keys(COLOR_FILTER.value);
    colors.map((color) => {
      const colorButton = new ColorButton(this.node, color);
      if (this.filterStorage.color.includes(COLOR_FILTER.value[color])) {
        colorButton.node.classList.add('active');
      } else {
        colorButton.node.classList.remove('active');
      }
      this.setEventListener(colorButton.node, color);
      return false;
    });
  }

  private setEventListener(colorButton: HTMLElement, color: string): void {
    colorButton.onclick = () => {
      this.onFilter(color);
      this.isChecked = !this.isChecked;
      colorButton.classList.toggle('active');
    };
  }
}
