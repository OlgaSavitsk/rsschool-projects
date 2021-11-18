import Control from "../common/control"
import { ButtonCategories } from "../components/button-categories/button-categories"
import { Logo } from "../components/logo/logo"
import { StoreCard } from "../components/store-card/store-card"
import { ScoreCardField } from "../components/store-card/store-cardfield"
import { IImageModel } from "../models/image-model"

export class ScorePage extends Control {
    cardField: ScoreCardField
    indexCategory: number
    scoreCard!: StoreCard

    constructor(parentNode: HTMLElement, indexCategory: number) {
        super(parentNode, 'div', 'container', '')
        const logo = new Logo(this.node)
        const categoriesPanel = new ButtonCategories(this.node, 'score')
        this.cardField = new ScoreCardField(this.node)
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
                const card = new StoreCard(this.cardField.node, cat, this.indexCategory) 
               // this.getLocalStorageAnswer(cat)   
            })
        })
    } 
}