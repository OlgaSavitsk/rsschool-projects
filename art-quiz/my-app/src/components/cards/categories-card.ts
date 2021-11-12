import Control from "../../common/control";

export class CategoriesCard extends Control {

    constructor(parentNode: HTMLElement, readonly image: string) {
        super(parentNode, 'div', 'categories-card', '')
        this.node.innerHTML = `<span class="number">1</span>
            <h3>landscape</h3>
            <div class="category-image style="background-image: url('./assets/${image}')"></div>`
    }
}