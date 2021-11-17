import Control from "../../common/control";

export class Categories extends Control {
    artistsCategory: Control<HTMLElement>;
    picturesCategory: Control<HTMLElement>;
    onPathToCategories!: () => void

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'category', '')
        this.artistsCategory = new Control(this.node, 'div', 'artists', '')
        this.artistsCategory.node.innerHTML = `<div class="card-container">
        <a href="#categories">
            <div class="card">
                <div class="card__front card-artists">
                    <div class="card-title">artists <span>quiz</span></div>
                </div>
            </div>
        </a>
        </div>`
        this.picturesCategory = new Control(this.node, 'div', 'pictures', '')
        this.picturesCategory.node.innerHTML = ` <div class="card-container">
            <div class="card">
                <div class="card__front card-pictures">
                    <div class="card-title">pictures <span>quiz</span></div>
                </div>
            </div>
        </div>`
    }
}