import Control from '../../common/control';
import { IDefaultFilters } from '../main-toys-container/main-toys-container';
import Count from './count/count';
import Year from './year/year';

export default class RangeControl extends Control {
  countValue: Count;
  yearValue: Year;

  constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'range', '');
    this.node.innerHTML = `<h2 class="control-title">Фильтры по диапазону</h2>`
    this.countValue = new Count(this.node, filterStorage)
    this.yearValue = new Year(this.node, filterStorage)
  }
}