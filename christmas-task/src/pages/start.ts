import Control from "@/common/control";
import Header from "@/components/header-container/header";

export default class StartPage extends Control {
    header: Header;
    startButton: Control<HTMLButtonElement>;
    ballFirst: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page start-page', '');
    this.header = new Header(this.node);
    this.ballFirst = new Control(this.node, 'div', 'ball f', '')
    const ballSecond = new Control(this.node, 'div', 'ball s', '')
    this.node.innerHTML = `<h1 class="start-page-title">Новогодняя игра<span>«Наряди ёлку»</span></h1>`
    this.startButton = new Control(this.node, 'button', 'switch-start-page', 'Начать')
  }
}