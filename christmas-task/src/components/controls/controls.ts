import Control from '../../common/control';
import Filter from './filter';
import RangeControl from './range';
import SortControl from './sort';

export default class Controls extends Control {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'controls', '');
    const filter = new Filter(this.node)
    const range = new RangeControl(this.node)
    const sort = new SortControl(this.node)
  }
}