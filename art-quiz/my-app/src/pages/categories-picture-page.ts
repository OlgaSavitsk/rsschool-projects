import Control from "../common/control"
import { ButtonCategories } from "../components/button-categories/button-categories"
import { Footer } from "../components/footer/footer"
import { Logo } from "../components/logo/logo"
import { PictureCategoriesCard } from "../components/picture category-card/picture-category-card"
import { PictureCategoriesCardField } from "../components/picture category-card/picture-category-cardfield"
import { ICategoriesModel } from "../models/categories-model"
import { QuestionsPicturesPage } from "./question-pictures-page"

export class CategoriesPicturesPage extends Control {
    newArr: string[]
    correctAnswerNumber!: any
    cat: any
    isUndefined!: boolean
    pictureCardField: PictureCategoriesCardField

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'container', '')
        const logo = new Logo(this.node)
        const categoriesPanel = new ButtonCategories(this.node, 'categories')
        this.pictureCardField = new PictureCategoriesCardField(this.node)
        const footer = new Footer(this.node)
        this.newArr = []
        this.start()
    }

    async start() {
        const response = await fetch('category-images.json');
        const categories: ICategoriesModel[] = await response.json();
        this.cat = categories[1];
        const images = this.cat.images.map(name => `${this.cat.category}/${name}`);
        images.map(async (url, index) => {
            const answer = await this.getLocalStorageAnswer(index)
            const card = new PictureCategoriesCard(this.pictureCardField.node, url, index+1, this.cat.categories[index], answer)     
           card.onChangeCategoryQuestions = () => {
               new QuestionsPicturesPage(this.node, index)
           }  
        }) 
    } 

    getLocalStorageAnswer(index: number): any {
        const storageValuePicture = JSON.parse(localStorage.getItem('answers-picture')!) || []
        try {
            this.correctAnswerNumber = storageValuePicture[index]
            return this.correctAnswerNumber.length
        }catch(err) {
            console.log(err)
        }
    }
}