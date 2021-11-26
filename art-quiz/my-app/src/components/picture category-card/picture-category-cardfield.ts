import Control from '../../common/control';
import PictureCategoriesCard from './picture-category-card';

export default class PictureCategoriesCardField extends Control {
  private cards: PictureCategoriesCard[] = [];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'categories-container', '');
  }

  addCards(cards: PictureCategoriesCard[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.node.appendChild(card.node));
  }
}
