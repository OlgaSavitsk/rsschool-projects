import Control from '../../common/control';
import { IDefaultFilters } from '../../models/default-filter-model';
import Filter from './filter';
import RangeControl from './range';
import SortControl from './sort';

export default class Controls extends Control {
  sort: SortControl;
  filter: Filter;
  range: RangeControl;

  constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'controls', '');
    this.filter = new Filter(this.node, filterStorage)
    this.range = new RangeControl(this.node, filterStorage)
    this.sort = new SortControl(this.node)
  }
}