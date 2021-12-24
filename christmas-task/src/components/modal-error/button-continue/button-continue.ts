import Control from '../../../common/control';

export default class ButtonContinue extends Control {
  private buttonNext: Control<HTMLButtonElement>;

  public onClick!: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'button-container', '');
    this.buttonNext = new Control(this.node, 'button', 'settings', 'продолжить');
    this.node.onclick = () => {
      this.onClick();
    };
  }
}
