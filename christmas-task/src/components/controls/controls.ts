import Control from '../../common/control';
import Filter from './filter';
import RangeControl from './range';
import SortControl from './sort';

export default class Controls extends Control {
  sort: SortControl;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'controls', '');
    const filter = new Filter(this.node)
    const range = new RangeControl(this.node)
    this.sort = new SortControl(this.node)
  }
}