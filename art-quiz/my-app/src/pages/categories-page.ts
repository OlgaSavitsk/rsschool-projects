import Control from "../common/control"
import { ButtonCategories } from "../components/button-categories/button-categories"
import { CategoriesCard } from "../components/cards/categories-card"
import { CategoriesCardField } from "../components/cards/categories-cardfield"
import { Logo } from "../components/logo/logo"
import { ICategoriesModel } from "../models/categories-model"

export class CategoriesPage extends Control {
    cardField: CategoriesCardField
    title!: string
    name!: string
    index!: number

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'container', '')
        const logo = new Logo(this.node)
        const categoriesPanel = new ButtonCategories(this.node)
        this.cardField = new CategoriesCardField(this.node)
        this.start()
    }

    async start() {
        const response = await fetch('/category-images.json');
        const categories: ICategoriesModel[] = await response.json();
        const cat = categories[0];
        const images = cat.images.map(name => `${cat.category}/${name}`);
        images.map((url, index) => {
            new CategoriesCard(this.cardField.node, url, index+1, cat.categories[index])       
        }) 
    }
}