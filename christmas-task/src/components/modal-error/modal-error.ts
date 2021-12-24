import Control from '../../common/control';
import ButtonContinue from './button-continue/button-continue';

export default class ModalError extends Control {
  public modalContainer: Control<HTMLElement>;

  constructor(
    parentNode: HTMLElement,
    message: string,
  ) {
    super(parentNode, 'div', 'modal', '');
    this.modalContainer = new Control(this.node, 'div', 'modal-congratulation', '');
    this.modalContainer.node.innerHTML = `<span class="congratulation-title">${message}</span>`;
    const modalButton = new ButtonContinue(this.node);
    this.modalContainer.node.insertAdjacentElement('beforeend', modalButton.node);
    modalButton.onClick = () => {
      this.destroy();
    };
  }
}
