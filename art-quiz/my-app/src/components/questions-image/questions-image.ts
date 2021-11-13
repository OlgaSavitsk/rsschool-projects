import Control from "../../common/control"

export class QuestionsImage extends Control {
    dotsContainer: Control<HTMLElement>
    dot: Control<HTMLElement>

    constructor(parentNode: HTMLElement, i: number) {
        super(parentNode, 'div', 'settings-container', '')
       this.node.innerHTML = `<div class="question-image" style="background-image: url('../assets/img/img/${i}.jpg')"></div>`
       this.dotsContainer = new Control(this.node, 'div', 'dots-container', '')
       this.dot = new Control(this.node, 'span', 'dot', '')
       this.dotsContainer.node.appendChild(this.dot.node)
    }
}