import Control from '../../common/control';
import Count from './count/count';
import Year from './year/year';

export default class RangeControl extends Control {
  countValue: Count;
  yearValue: Year;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'range', '');
    this.node.innerHTML = `<h2 class="control-title">Фильтры по диапазону</h2>`
    this.countValue = new Count(this.node)
    this.yearValue = new Year(this.node)
  }
}