import Control from '../../common/control';
import ButtonCongratulation from '../button-congratulation/button-congratulation';

export default class ModalCongratulation extends Control {
  modalContainer: Control<HTMLElement>;

  correctAnswerNumber: number;

  indexCategory: number;

  onNextButtonClick: (() => void) | undefined;

  constructor(
    parentNode: HTMLElement,
    indexCategory: number,
    correctAnswerNumber: number,
    pathToCategory: string,
  ) {
    super(parentNode, 'div', 'modal', '');
    this.indexCategory = indexCategory;
    this.correctAnswerNumber = correctAnswerNumber;
    this.modalContainer = new Control(this.node, 'div', 'modal-congratulation', '');
    this.modalContainer.node.innerHTML = `
                <h2>congratulations!</h2>
                <span class="congratulation-title">${this.correctAnswerNumber} / 10</span>
                <span class="congratulation-image"></span>`;
    const modalButton = new ButtonCongratulation(this.node, this.indexCategory, pathToCategory);
    this.modalContainer.node.insertAdjacentElement('beforeend', modalButton.node);
  }
}
