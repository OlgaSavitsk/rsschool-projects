import Control from '@/common/control';
import { IDefaultFilters } from '@/models/default-filter-model';
import Form from './form';

export default class FavoriteContainer extends Control {
  form: Form;

  constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'favorite-container', 'Только любимые :');
    this.form = new Form(this.node, filterStorage);
  }
}
