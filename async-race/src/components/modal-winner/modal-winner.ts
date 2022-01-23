import Control from '@/common/components/control';

export default class ModalWinner extends Control {
  public modalContainer: Control<HTMLElement>;

  public buttonNext: Control<HTMLButtonElement>;

  public onClick!: () => void;

  constructor(
    parentNode: HTMLElement,
    message: string,
  ) {
    super(parentNode, 'div', '', '');
    this.modalContainer = new Control(this.node, 'div', 'modal-congratulation', '');
    this.modalContainer.node.innerHTML = `<span class="congratulation-title">${message}</span>`;
    this.buttonNext = new Control(this.modalContainer.node, 'button', 'settings', 'OK');
    this.setEventListener();
  }

  private setEventListener(): void {
    this.buttonNext.node.onclick = () => {
      this.onClick();
    };
  }
}
