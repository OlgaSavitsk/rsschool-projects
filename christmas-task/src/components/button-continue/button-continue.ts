import Control from '../../common/control';

export default class ButtonContinue extends Control {

  private buttonNextQuiz: Control<HTMLButtonElement>;
  onClick!: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'button-container', '');
    this.buttonNextQuiz = new Control(this.node, 'button', 'settings', 'продолжить');
    this.node.onclick = () => {
        this.onClick()
    }
  }
}
