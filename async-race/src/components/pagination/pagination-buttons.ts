import Control from '@/common/components/control';

export default class PaginationButtons extends Control {
  public prevButton: Control<HTMLButtonElement>;

  public nextButton: Control<HTMLButtonElement>;

  public onNextPage!: () => void;

  public onPrevPage!: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'pagination-container', '');
    this.prevButton = new Control(this.node, 'button', 'button menu-button', 'PREV');
    this.nextButton = new Control(this.node, 'button', 'button menu-button', 'NEXT');
    this.setEventListener();
  }

  private setEventListener(): void {
    this.nextButton.node.onclick = () => {
      this.onNextPage();
    };
    this.prevButton.node.onclick = () => {
      this.onPrevPage();
    };
  }
}
