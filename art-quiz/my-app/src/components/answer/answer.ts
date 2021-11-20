import Control from "../../common/control"

export class AnswerContainer extends Control {
    onClick: () => void = () => {}
    onAnswerClick: ((answer) => void) | null = null

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'answer-container', '')
    }

    async getRandomAnswer(authorSet) {
        const artists = authorSet.sort(() => Math.random() - 0.5)
        for(let name of artists) {
            const answer = new Control(this.node, 'div', 'answer', name)
            answer.node.onclick = () => {
                if(this.onAnswerClick) {
                    this.onAnswerClick(answer)
                }
            } 
        }
    }
}