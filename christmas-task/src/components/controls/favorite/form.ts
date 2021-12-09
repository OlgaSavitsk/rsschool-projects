import Control from '../../../common/control';

export default class Form extends Control {
  favoriteInput: Control<HTMLInputElement>;
    favoriteLabel: Control<HTMLLabelElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'form', '');
    this.favoriteInput = new Control(this.node, 'input', 'favorite-input', '')
    this.favoriteInput.node.setAttribute('type', 'checkbox')
    this.favoriteInput.node.setAttribute('id', 'checkbox')
    this.favoriteLabel = new Control(this.node, 'label', 'favorite-input-label', '')
    this.favoriteLabel.node.setAttribute('for', 'checkbox')
  }
}