import Control from "../../common/control"

export class Answer extends Control {

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'answer-container', '')
    }

    async getRandomAnswer(artistsSet: Set<string>) {
        const artists = Array.from(artistsSet).sort(() => Math.random() - 0.5)
        for(let name of artists) {
            new Control(this.node, 'div', 'answer', name)
        }
    }
}