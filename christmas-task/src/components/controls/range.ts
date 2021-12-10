import Control from '../../common/control';
import Count from './count/count';
import Year from './year/year';

export default class RangeControl extends Control {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'range', '');
    this.node.innerHTML = `<h2 class="control-title">Фильтры по диапазону</h2>`
    const count = new Count(this.node)
    const year = new Year(this.node)
  }
}