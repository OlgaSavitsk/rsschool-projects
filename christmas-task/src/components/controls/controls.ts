import Control from '../../common/control';

export default class Controls extends Control {
  searchInput: Control<HTMLInputElement>;
    favorite: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'controls', '');
    this.searchInput = new Control(this.node, 'input', 'search', '')
    this.favorite = new Control(this.node, 'div', 'favorite', '')
    this.favorite.node.innerHTML = `<span>0</span>`
  }
}