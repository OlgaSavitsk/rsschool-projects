import Control from '../../common/control';
import Filter from './filter';
import RangeControl from './range';
import SortControl from './sort';

export default class Controls extends Control {
  sort: SortControl;
  filter: Filter;
  range: RangeControl;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'controls', '');
    this.filter = new Filter(this.node)
    this.range = new RangeControl(this.node)
    this.sort = new SortControl(this.node)
  }

}