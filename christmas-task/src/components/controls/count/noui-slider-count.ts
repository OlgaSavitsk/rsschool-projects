import noUiSlider from 'nouislider';
import Control from '@/common/control';
import { IDefaultFilters } from '@/models/default-filter-model';

export default class NoUiSliderCount extends Control {
  public node!: noUiSlider.Instance;

  constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'filter-slider', '');
    noUiSlider.create(this.node, {
      start: [+filterStorage.count[0], +filterStorage.count[1]],
      connect: true,
      range: {
        min: 1,
        max: 12,
      },
    });
  }
}
