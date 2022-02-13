import Control from '@/common/components/control';

export default class StartPage extends Control {
  public startButton: Control<HTMLButtonElement>;

  public toToyPage!: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container start-page', '');
    const ballFirst = new Control(this.node, 'div', 'ball first', '');
    const ballSecond = new Control(this.node, 'div', 'ball second', '');
    ballSecond.node.insertAdjacentHTML('afterend', '<h1 class="start-page-title">Новогодняя игра<span>«Наряди ёлку»</span></h1>');
    this.startButton = new Control(this.node, 'button', 'switch-start-page', 'Начать');
    this.setEventListener();
  }

  private setEventListener(): void {
    this.startButton.node.onclick = () => {
      this.toToyPage();
    };
  }
}
