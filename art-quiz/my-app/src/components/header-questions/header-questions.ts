import Control from "../../common/control"
import { Logo } from "../logo/logo"
import { Timer } from "../timer/timer"

export class HeaderQuestions extends Control {
    timer: Timer

    constructor(parentNode: HTMLElement, title: string) {
        super(parentNode, 'div', 'header-questions', '')
        const logo = new Logo(this.node)
        logo.node.classList.add('questions')
        this.node.insertAdjacentHTML('beforeend', `<h2 class="question-title">${title}</h2>`)
        this.timer = new Timer(this.node)
    }
}