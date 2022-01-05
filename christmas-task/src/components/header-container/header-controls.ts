import Control from '@/common/components/control';
import Favorite from './favorite-count';

export default class HeaderControls extends Control {
  public searchInput: Control<HTMLInputElement>;

  public favorite: Favorite;

  private val: string | undefined;

  public errorField: Control<HTMLElement>;

  public onSearch: ((val: string) => void) | undefined;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'header-controls', '');
    this.searchInput = new Control(this.node, 'input', 'search', '');
    const closeLabel = new Control(this.node, 'label', 'close', '');
    closeLabel.node.setAttribute('for', 'search');
    this.searchInput.node.setAttribute('placeholder', 'Искать...');
    this.searchInput.node.setAttribute('id', 'search');
    this.searchInput.node.focus();
    this.errorField = new Control(this.node, 'div', 'error', '');
    this.favorite = new Favorite(this.node);
    this.searchInput.node.onkeyup = () => {
      closeLabel.node.style.backgroundImage = 'url(./assets/svg/icons8-close.svg)';
      this.val = this.searchInput.node.value.toLowerCase();
      if (this.searchInput.node.value.length === 0) {
        closeLabel.node.style.backgroundImage = 'url(./assets/svg/search.svg)';
      }
      if (this.onSearch) {
        this.onSearch(this.val);
      }
    };
    closeLabel.node.onclick = () => {
      closeLabel.node.style.backgroundImage = 'url(./assets/svg/search.svg)';
      this.searchInput.node.value = '';
      this.val = '';
      this.onSearch!(this.val);
    };
  }
}
