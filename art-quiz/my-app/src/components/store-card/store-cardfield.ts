import Control from "../../common/control";
import { StoreCard } from "./store-card";

export class ScoreCardField extends Control {
    private cards: StoreCard[] = [];

    constructor(parentNode: HTMLElement) {
        super(parentNode, 'div', 'categories-container', '')
    }

    addCards(cards: StoreCard[]): void {
        this.cards = cards;
        this.cards.forEach(card => this.node.appendChild(card.node));
    }
}