import Control from '../../../common/control';
import { IDefaultFilters } from '../../../models/default-filter-model';
import CountSlider from './count-slider';

export default class Count extends Control {
  public countSlider: CountSlider;

  constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'count', '');
    this.node.innerHTML = '<span class="control-span">Количество экземпляров :</span>';
    this.countSlider = new CountSlider(this.node, filterStorage);
  }
}
