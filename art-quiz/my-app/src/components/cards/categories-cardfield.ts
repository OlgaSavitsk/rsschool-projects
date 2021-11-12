import Control from "../../common/control";
import { CategoriesCard } from "./categories-card";

export class CategoriesCardField extends Control {
    private cards: CategoriesCard[] = [];

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'settings-container', '')
    }

    addCards(cards: CategoriesCard[]): void {
        this.cards = cards;
        this.cards.forEach(card => this.node.appendChild(card.node));
    }
}