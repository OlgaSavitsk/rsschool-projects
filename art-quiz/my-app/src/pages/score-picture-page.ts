import Control from "../common/control"
import { ButtonScore } from "../components/button-score/button-score"
import { Footer } from "../components/footer/footer"
import { Logo } from "../components/logo/logo"
import { ScoreCard } from "../components/score-card/score-card"
import { ScoreCardField } from "../components/score-card/score-cardfield"

export class ScorePicturePage extends Control {
    cardField: ScoreCardField
    indexCategory: number
    isPictureCategory: boolean

    constructor(parentNode: HTMLElement, indexCategory: number) {
        super(parentNode, 'div', 'container', '')
        const logo = new Logo(this.node)
        const categoriesPanel = new ButtonScore(this.node, 'pictures')
        this.cardField = new ScoreCardField(this.node)
        const footer = new Footer(this.node)
        this.indexCategory = indexCategory
        this.isPictureCategory = true
        this.setCard(this.indexCategory)
    }

    async getData() {
        const response = await fetch('images.json');
        const categories = await response.json();   
        return categories
    }

   async setCard(indexCategory: number) {
    const splitArr = (arr, chunks) => [
        ...Array(chunks),
      ].map((_, c) => arr.filter((n, index) => index % chunks === c)); 
      await this.getData().then(res => {
        const newQuestion = splitArr(res, 24).slice(12)
        console.log('newQuestion', newQuestion)
        return newQuestion
      }).then(res => {
        return res[indexCategory]
        }).then((category) => {
            Object.values(category).map(cat => {
                const card = new ScoreCard(this.cardField.node, cat, this.indexCategory, this.isPictureCategory) 
            })
        })
    } 
}