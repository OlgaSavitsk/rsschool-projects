import noUiSlider from 'nouislider';
import { IDefaultFilters } from '@/models/default-filter-model';
import Control from '@/common/components/control';

export default class NoUiSliderYear extends Control {
  public node!: noUiSlider.Instance;

  constructor(parentNode: HTMLElement, public filterStorage: IDefaultFilters) {
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
