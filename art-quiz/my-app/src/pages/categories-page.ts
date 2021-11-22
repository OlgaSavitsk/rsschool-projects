import Control from "../common/control"
import { ButtonCategories } from "../components/button-categories/button-categories"
import { CategoriesCard } from "../components/cards/categories-card"
import { CategoriesCardField } from "../components/cards/categories-cardfield"
import { Footer } from "../components/footer/footer"
import { Logo } from "../components/logo/logo"
import { ICategoriesModel } from "../models/categories-model"
import { QuestionsArtistPage } from "./question-artist-page"

export class CategoriesPage extends Control {
    cardField: CategoriesCardField
    newArr: string[]
    correctAnswerNumber!: any
    cat: any
    isUndefined!: boolean

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'container', '')
        const logo = new Logo(this.node)
        const categoriesPanel = new ButtonCategories(this.node, 'categories')
        this.cardField = new CategoriesCardField(this.node)
        const footer = new Footer(this.node)
        this.newArr = []
        this.start()
    }

    async start() {
        const response = await fetch('category-images.json');
        const categories: ICategoriesModel[] = await response.json();
        this.cat = categories[0];
        const images = this.cat.images.map(name => `${this.cat.category}/${name}`);
        images.map(async (url, index) => {
            const answer = await this.getLocalStorageAnswer(index)
            const card = new CategoriesCard(this.cardField.node, url, index+1, this.cat.categories[index], answer)     
           card.onChangeCategoryQuestions = () => {
               new QuestionsArtistPage(this.node, index)
           }  
        }) 
    } 

    getLocalStorageAnswer(index: number): (number | undefined) {
        const storageValue = JSON.parse(localStorage.getItem('answers')!) || []
        try {
            this.correctAnswerNumber = storageValue[index]
            return this.correctAnswerNumber.length
        }catch(err) {
            console.log(err)
        }
    }
}