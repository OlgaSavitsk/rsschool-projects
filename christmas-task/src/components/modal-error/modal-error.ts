import Control from '../../common/control';
import ButtonContinue from '../button-continue/button-continue';

export default class ModalError extends Control {
  modalContainer: Control<HTMLElement>;
  //onContinueClick: (() => void) | undefined;

  constructor(
    parentNode: HTMLElement,
  ) {
    super(parentNode, 'div', 'modal', '');
    this.modalContainer = new Control(this.node, 'div', 'modal-congratulation', '');
    this.modalContainer.node.innerHTML = `<span class="congratulation-title">Извините, все слоты заполнены</span>`;
    const modalButton = new ButtonContinue(this.node);
    this.modalContainer.node.insertAdjacentElement('beforeend', modalButton.node); 
    modalButton.onClick = () => {
      this.destroy()
    }
  }
}
