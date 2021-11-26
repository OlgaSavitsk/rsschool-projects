import Control from '../../common/control';
import { IImageModel } from '../../models/image-model';
import constants from '../../constants';

export default class ScoreCard extends Control {
  imageScore: Control<HTMLElement>;

  indexCategory: number;

  isPictureCategory: boolean;

  scoreInfo!: Control<HTMLElement>;

  isInfo: boolean;

  constructor(
    parentNode: HTMLElement,
    readonly image: IImageModel,
    indexCategory: number,
    isPictureCategory: boolean,
  ) {
    super(parentNode, 'div', 'score-card', '');
    this.isPictureCategory = isPictureCategory;
    this.image = image;
    this.isInfo = false;
    this.indexCategory = indexCategory;
    this.node.innerHTML = `<h3 class="score-title">${this.indexCategory + 1}</h3>`;
    this.imageScore = new Control(this.node, 'div', 'score-image grayscale', '');
    this.styleBg();
    this.setScoreCard();
    this.node.onclick = () => {
      this.isInfo = !this.isInfo;
      this.scoreInfo.node.classList.add('transition-info');
      if (this.isInfo === true) {
        this.isInfo = false;
        this.scoreInfo.node.classList.remove('transition-info');
      }
    };
  }

  async styleBg() {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = `${constants.IMAGE_URL}/${this.image.imageNum}.jpg`;
      img.onload = () => {
        resolve(img.src);
      };
    })
      .then((src) => {
        this.imageScore.node.style.backgroundImage = `url(${src})`;
        return this.imageScore.node;
      });
  }

  getLocalStorageAnswer(localStorageName: string): void {
    const storageValue = JSON.parse(localStorage.getItem(localStorageName)!) || [];
    storageValue[this.indexCategory].map((item: number) => {
      if (item === this.image.imageNum) {
        this.imageScore.node.classList.remove('grayscale');
        this.scoreInfo = new Control(this.node, 'div', 'score-info-card', '');
        this.scoreInfo.node.innerHTML = `<div>${this.image.name}</div>
                <div>${this.image.author}</div>
                <div>${this.image.year}</div>`;
      }
      return this.scoreInfo;
    });
  }

  setScoreCard(): void {
    if (this.isPictureCategory === true) {
      this.getLocalStorageAnswer('answers-picture');
    } else this.getLocalStorageAnswer('answers');
  }
}
