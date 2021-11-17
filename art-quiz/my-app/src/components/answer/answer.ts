import Control from "../../common/control"
import { IImageModel } from "../../models/image-model"

export class AnswerContainer extends Control {
    onClick: () => void = () => {}
    onAnswerClick: ((answer) => void) | null = null

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'answer-container', '')
    }

    async getRandomAnswer(authorSet) {
        //console.log(authorSet)
        const artists = authorSet.sort(() => Math.random() - 0.5)
       // console.log(artists)
        for(let name of artists) {
            //const nameAuthor = Object.values(name)[0]
            const answer = new Control(this.node, 'div', 'answer', name)
            answer.node.onclick = () => {
                if(this.onAnswerClick) {
                    this.onAnswerClick(answer)
                }
            } 
        }
    }
}