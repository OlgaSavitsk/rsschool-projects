import Control from '@/common/components/control';
import { FAVOURITE_LABEL_IMAGE } from '@/common/constants/app-links';
import { IDefaultFilters } from '@/models/default-filter-model';

export default class Form extends Control {
  private favoriteInput: Control<HTMLInputElement>;

  private favoriteLabel: Control<HTMLLabelElement>;

  public isChecked: boolean = false;

  private checkValue!: string;

  public onFilter!: (check: string) => void;

  constructor(parentNode: HTMLElement, public filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'form', '');
    this.favoriteInput = new Control(this.node, 'input', 'favorite-input', '');
    this.favoriteInput.node.setAttribute('type', 'checkbox');
    this.favoriteInput.node.setAttribute('id', 'checkbox');
    this.favoriteLabel = new Control(this.node, 'label', 'favorite-input-label', '');
    this.favoriteLabel.node.setAttribute('for', 'checkbox');
    this.filterStorage = filterStorage;
    if (this.filterStorage.favorite[0] === 'да') {
      this.isChecked = !this.isChecked;
      this.favoriteLabel.node.style.backgroundImage = `url(${FAVOURITE_LABEL_IMAGE})`;
    }
    this.setEventListener();
  }

  private setEventListener(): void {
    this.favoriteInput.node.onclick = () => {
      this.favoriteLabel.node.style.backgroundImage = `url(${FAVOURITE_LABEL_IMAGE})`;
      this.isChecked = !this.isChecked;
      this.checkValue = 'true';
      if (!this.isChecked) {
        this.checkValue = 'false';
        this.favoriteLabel.node.style.backgroundImage = 'none';
      }
      this.onFilter(this.checkValue);
    };
  }
}
