import Control from "../common/control"
import { Answer } from "../components/answer/answer"
import { HeaderQuestions } from "../components/header-questions/header-questions"
import { QuestionsImage } from "../components/questions-image/questions-image"

export class QuestionsArtistPage extends Control {
    imageNumber!: number
    indexImage: number = 0

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'container', '')
        const headerQuestions = new HeaderQuestions(this.node)
        this.setImage()
        this.setAnswer()
    }

    async getData() {
        const response = await fetch('/images.json');
        const categories = await response.json();
        return categories
    }

   async setImage() {
        await this.getData().then(res => this.imageNumber = res[this.indexImage].imageNum)
        const questionsImage = new QuestionsImage(this.node, this.imageNumber!)
   } 

   async setAnswer() {
    let set: Set<string> = new Set()
    await this.getData().then(res => set.add(res[this.indexImage].author))
    await this.getData().then(res => {
        const authors = res.map(cat => cat);
        let randomAuthor = authors.sort(() => Math.random() - 0.5)
            for(let i= 0; i <= 2; i++) {
                set.add(randomAuthor[i].author)
            }
        const answer = new Answer(this.node)
        answer.getRandomAnswer(set)
        })
    }
}