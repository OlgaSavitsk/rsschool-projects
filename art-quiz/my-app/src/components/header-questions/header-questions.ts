import Control from "../../common/control"
import { Logo } from "../logo/logo"

export class HeaderQuestions extends Control {
    timer: Control<HTMLElement>

    constructor(parentNode: HTMLElement, title: string) {
        super(parentNode, 'div', 'header-questions', '')
        const logo = new Logo(this.node)
        logo.node.classList.add('questions')
        this.node.insertAdjacentHTML('beforeend', `<h2 class="question-title">${title}</h2>`)
        this.timer = new Control(this.node, 'div', 'timer-container', '')
        this.timer.node.innerHTML = `<span class="timer-icon"></span>
            <span class="timer">00:00</span>`
            this.node.insertAdjacentElement('beforeend', this.timer.node)
    }
}