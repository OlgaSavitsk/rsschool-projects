import Control from "../common/control"
import { ButtonCategories } from "../components/button-categories/button-categories"
import { Logo } from "../components/logo/logo"

export class CategoriesPage extends Control {

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'container', '')
        const logo = new Logo(this.node)
        const categoriesPanel = new ButtonCategories(this.node)
    }
}