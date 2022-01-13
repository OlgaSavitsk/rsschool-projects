import Control from '@/common/components/control';
import { DEFAULT_SCALE } from '@/common/constants/constants';
import { SIZE_FILTER } from '@/common/constants/filter-constants';
import { IDefaultFilters } from '@/models/default-filter-model';
import SizeButton from './size-button';

export default class Size extends Control {
  public onFilter!: (color: string) => void;

  public isChecked: boolean = false;

  private scale: number;

  constructor(parentNode: HTMLElement, public filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'size', 'Размер :');
    this.scale = DEFAULT_SCALE;
    this.renderSizeButton();
  }

  public renderSizeButton(): void {
    const sizes = Object.keys(SIZE_FILTER.value);
    sizes.map((size) => {
      const sizeButton = new SizeButton(this.node, size);
      if (this.filterStorage.size.includes(SIZE_FILTER.value[size])) {
        sizeButton.node.classList.add('select');
      } else {
        sizeButton.node.classList.remove('select');
      }
      sizeButton.node.style.transform = `scale(${this.scale -= 0.3})`;
      this.setEventListener(sizeButton, size);
      return false;
    });
  }

  private setEventListener(sizeButton: SizeButton, size: string): void {
    sizeButton.node.onclick = () => {
      this.onFilter(size);
      this.isChecked = !this.isChecked;
      sizeButton.node.classList.toggle('select');
    };
  }
}
