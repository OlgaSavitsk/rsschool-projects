import Control from "@/common/control";
import Footer from "@/components/footer/footer";
import Header from "@/components/header-container/header";

export default class StartPage extends Control {
    startButton: Control<HTMLButtonElement>;
    toToyPage!: () => void

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container start-page', '');
    const ballFirst = new Control(this.node, 'div', 'ball f', '')
    const ballSecond = new Control(this.node, 'div', 'ball s', '')
    ballSecond.node.insertAdjacentHTML('afterend', '<h1 class="start-page-title">Новогодняя игра<span>«Наряди ёлку»</span></h1>')
    this.startButton = new Control(this.node, 'button', 'switch-start-page', 'Начать') 
    this.startButton.node.onclick = () => {
      this.toToyPage()
    }
  }
}