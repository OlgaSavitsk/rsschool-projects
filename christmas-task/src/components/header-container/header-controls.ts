import Control from '../../common/control';
import Favorite from './favorite';

export default class HeaderControls extends Control {
  searchInput: Control<HTMLInputElement>;
  favorite: Favorite;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'header-controls', '');
    this.searchInput = new Control(this.node, 'input', 'search', '')
    this.favorite = new Favorite(this.node)
  }
}