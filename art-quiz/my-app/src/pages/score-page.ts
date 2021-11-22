import Control from "../common/control"
import { ButtonScore } from "../components/button-score/button-score"
import { Footer } from "../components/footer/footer"
import { Logo } from "../components/logo/logo"
import { ScoreCard } from "../components/score-card/score-card"
import { ScoreCardField } from "../components/score-card/score-cardfield"
import { IImageModel } from "../models/image-model"

export class ScorePage extends Control {
    cardField: ScoreCardField
    indexCategory: number

    constructor(parentNode: HTMLElement, indexCategory: number) {
        super(parentNode, 'div', 'container', '')
        const logo = new Logo(this.node)
        const categoriesPanel = new ButtonScore(this.node, 'categories')
        this.cardField = new ScoreCardField(this.node)
        const footer = new Footer(this.node)
        this.indexCategory = indexCategory
        this.setCard(this.indexCategory)
    }

    async getData() {
        const response = await fetch('/images.json');
        const categories = await response.json();
        const questionByAuthor: IImageModel[] = []
        const questionByPicture: IImageModel[] = []
        categories.forEach((item: IImageModel, index: number) => {
            if(index % 2 === 0) {
                questionByAuthor.push(item)
            }
            if(index % 2 !== 0) {
                questionByPicture.push(item)
            }
        })    
        return categories
    }

   async setCard(indexCategory: number) {
    const splitArr = (arr, chunks) => [
        ...Array(chunks),
      ].map((_, c) => arr.filter((n, index) => index % chunks === c)); 
      await this.getData().then(res => {
        const newQuestion = splitArr(res, 24)
        return newQuestion
      }).then(res => {
        return res[indexCategory]
        }).then((category) => {
            Object.values(category).map(cat => {
                const card = new ScoreCard(this.cardField.node, cat, this.indexCategory, false) 
            })
        })
    } 
}