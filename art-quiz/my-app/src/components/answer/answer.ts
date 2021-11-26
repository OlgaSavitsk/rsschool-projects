import Control from '../../common/control';

export default class AnswerContainer extends Control {
  onAnswerClick: ((answer: Control) => void) | null = null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'answer-container', '');
  }

  getRandomAnswer(authorSet): void {
    const artists = authorSet.sort(() => Math.random() - 0.5);
    for (const name of artists) {
      const answer = new Control(this.node, 'div', 'answer', name);
      answer.node.onclick = () => {
        if (this.onAnswerClick) {
          this.onAnswerClick(answer);
        }
      };
    }
  }
}
