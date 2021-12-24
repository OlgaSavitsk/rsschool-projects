import noUiSlider from 'nouislider';
import Control from '@/common/control';
import { IDefaultFilters } from '@/models/default-filter-model';

export default class NoUiSliderYear extends Control {
  node!: noUiSlider.Instance;

  constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'filter-slider', '');
    noUiSlider.create(this.node, {
      start: [+filterStorage.year[0], +filterStorage.year[1]],
      connect: true,
      range: {
        min: 1940,
        max: 2020,
      },
    });
  }
}
