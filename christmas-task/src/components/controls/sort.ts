import Control from '../../common/control';
import SortSelect from './sort-select';

export default class SortControl extends Control {
  buttonReset: Control<HTMLButtonElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'sort', '');
    this.node.innerHTML = `<h2 class="control-title">Сортировка</h2>`
    const sortSelect = new SortSelect(this.node)
    this.buttonReset = new Control(this.node, 'button', 'reset', 'Сброс фильтров')
  }
}