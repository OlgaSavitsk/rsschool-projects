import Control from '../../../common/control';
import Form from './form';

export default class FavoriteContainer extends Control {
  form: Form;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'favorite-container', 'Только любимые :');
    this.form = new Form(this.node)
  }
}