import Control from "../../common/control";

export class CategoriesCard extends Control {

    constructor(parentNode: HTMLElement, readonly image: string, number: number, title: string) {
        super(parentNode, 'div', 'categories-card', '')
        this.node.innerHTML = `<span class="number">${number}</span>
            <h3>${title}</h3>
            <div class="category-image" style="background-image: url('../assets/${image}')"></div>`;
    }
}