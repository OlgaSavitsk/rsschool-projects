import Control from '@/common/components/control';
import { IDefaultFilters } from '@/models/default-filter-model';
import YearSlider from './year-slider';

export default class Year extends Control {
  public yearSlider: YearSlider;

  constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'count', '');
    this.node.innerHTML = '<span class="control-span">Год приобретения :</span>';
    this.yearSlider = new YearSlider(this.node, filterStorage);
  }
}
