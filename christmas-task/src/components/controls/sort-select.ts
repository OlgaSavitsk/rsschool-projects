import Control from '@/common/components/control';

export default class SortSelect extends Control {
  public option: Control<HTMLOptionElement>;

  public node!: HTMLSelectElement;

  public onChange!: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'select', 'sort-select', '');
    this.option = new Control(this.node, 'option', '', 'По названию от «А» до «Я»');
    this.option.node.setAttribute('value', 'sort-name-max');
    this.option = new Control(this.node, 'option', '', 'По названию от «Я» до «А»');
    this.option.node.setAttribute('value', 'sort-name-min');
    this.option = new Control(this.node, 'option', '', 'По количеству по возрастанию');
    this.option.node.setAttribute('value', 'sort-count-max');
    this.option = new Control(this.node, 'option', '', 'По количеству по убыванию');
    this.option.node.setAttribute('value', 'sort-count-min');
    this.node.onchange = () => {
      this.onChange();
    };
  }
}
