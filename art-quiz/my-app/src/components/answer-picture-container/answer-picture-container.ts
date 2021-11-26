import Control from '../../common/control';
import constants from '../../constants';

export default class AnswerPictureContainer extends Control {
  onAnswerClick: ((answer: Control) => void) | null = null;

  answer!: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'picture-container', '');
  }

  async getRandomAnswerPicture(authorSet) {
    const artists = authorSet.sort(() => Math.random() - 0.5);
    for (const name of artists) {
      this.styleBg(name);
    }
  }

  async styleBg(name: string) {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = `${constants.IMAGE_URL}/${name}.jpg`;
      img.onload = () => {
        resolve(img.src);
      };
    })
      .then((src) => {
        const answer = new Control(this.node, 'div', 'picture-image', name);
        answer.node.style.backgroundImage = `url(${src})`;
        answer.node.onclick = () => {
          if (this.onAnswerClick) {
            this.onAnswerClick(answer);
          }
        };
      });
  }
}
