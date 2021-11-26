import Control from '../../common/control';

export default class AnswerPictureContainer extends Control {
  onAnswerClick: ((answer: Control) => void) | null = null;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'picture-container', '');
  }

  getRandomAnswerPicture(authorSet): void {
    const artists = authorSet.sort(() => Math.random() - 0.5);
    for (const name of artists) {
      const answer = new Control(this.node, 'div', 'picture-image', name);
      const img = new Image();
      img.src = `https://raw.githubusercontent.com/OlgaSavitsk/image-data/master/img/${name}.jpg`;
      img.onload = () => {
        answer.node.style.backgroundImage = `url(${img.src})`;
      };
      answer.node.onclick = () => {
        if (this.onAnswerClick) {
          this.onAnswerClick(answer);
        }
      };
    }
  }
}
