import Control from '@/common/components/control';
import { IDefaultFilters } from '@/models/default-filter-model';
import Form from './form';

export default class FavoriteContainer extends Control {
  public form: Form;

  constructor(parentNode: HTMLElement, public filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'favorite-container', 'Только любимые :');
    this.form = new Form(this.node, filterStorage);
  }
}
