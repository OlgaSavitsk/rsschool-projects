import Control from '@/common/components/control';
import { SEARCH_CLOSE_LABEL, SEARCH_LABEL } from '@/common/constants/app-links';
import Favorite from './favorite-count';

export default class HeaderControls extends Control {
  public searchInput: Control<HTMLInputElement>;

  public favorite: Favorite;

  private val: string | undefined;

  public errorField: Control<HTMLElement>;

  public onSearch: ((val: string) => void) | undefined;

  public closeLabel: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'header-controls', '');
    this.searchInput = new Control(this.node, 'input', 'search', '');
    this.closeLabel = new Control(this.node, 'label', 'close', '');
    this.closeLabel.node.setAttribute('for', 'search');
    this.searchInput.node.setAttribute('placeholder', 'Искать...');
    this.searchInput.node.setAttribute('id', 'search');
    this.searchInput.node.focus();
    this.errorField = new Control(this.node, 'div', 'error', '');
    this.favorite = new Favorite(this.node);
    this.setSearchInputEventListener();
    this.resetSearchInput();
  }

  private setSearchInputEventListener(): void {
    this.searchInput.node.onkeyup = () => {
      this.closeLabel.node.style.backgroundImage = `url(${SEARCH_CLOSE_LABEL})`;
      this.val = this.searchInput.node.value.toLowerCase();
      if (this.searchInput.node.value.length === 0) {
        this.closeLabel.node.style.backgroundImage = `url(${SEARCH_LABEL})`;
      }
      if (this.onSearch) {
        this.onSearch(this.val);
      }
    };
  }

  private resetSearchInput(): void {
    this.closeLabel.node.onclick = () => {
      this.closeLabel.node.style.backgroundImage = `url(${SEARCH_LABEL})`;
      this.searchInput.node.value = '';
      this.val = '';
      this.onSearch!(this.val);
    };
  }
}
