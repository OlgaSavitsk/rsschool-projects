import Control from '../../../common/control';
import Form from './form';

export default class FavoriteContainer extends Control {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'favorite-container', 'Только любимые :');
    const form = new Form(this.node)
  }
}