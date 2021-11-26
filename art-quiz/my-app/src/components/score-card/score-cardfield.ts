import Control from '../../common/control';
import ScoreCard from './score-card';

export default class ScoreCardField extends Control {
  private cards: ScoreCard[] = [];

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'categories-container', '');
  }

  addCards(cards: ScoreCard[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.node.appendChild(card.node));
  }
}
