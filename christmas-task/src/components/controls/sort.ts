import Control from '@/common/components/control';
import SortSelect from './sort-select';

export default class SortControl extends Control {
  public buttonReset: Control<HTMLButtonElement>;

  public onReset: (() => void) | undefined;

  public sortSelect: SortSelect;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'sort', '');
    this.node.innerHTML = '<h2 class="control-title">Сортировка</h2>';
    this.sortSelect = new SortSelect(this.node);
    this.buttonReset = new Control(this.node, 'button', 'reset', 'Сброс фильтров');
    this.setEventListener();
  }

  private setEventListener(): void {
    this.buttonReset.node.onclick = () => {
      if (this.onReset) {
        this.onReset();
      }
    };
  }
}
