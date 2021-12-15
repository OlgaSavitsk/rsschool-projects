import Control from '../../common/control';
import { IToysModel } from '../../models/toys-model';
import Filter from './filter';
import RangeControl from './range';
import SortControl from './sort';

export default class Controls extends Control {
  sort: SortControl;
  filter: Filter;
  range: RangeControl;
  data: IToysModel[];

  constructor(parentNode: HTMLElement, data: IToysModel[]) {
    super(parentNode, 'div', 'controls', '');
    this.data = data
    this.filter = new Filter(this.node, this.data)
    this.range = new RangeControl(this.node)
    this.sort = new SortControl(this.node)
  }

}