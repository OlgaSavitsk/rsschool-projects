import Control from '../common/control';
import ButtonScore from '../components/button-score/button-score';
import Footer from '../components/footer/footer';
import Logo from '../components/logo/logo';
import ScoreCard from '../components/score-card/score-card';
import ScoreCardField from '../components/score-card/score-cardfield';
import { IImageModel } from '../models/image-model';

export default class ScorePicturePage extends Control {
  cardField: ScoreCardField;

  indexCategory: number;

  isPictureCategory: boolean;

  logo: Logo;

  categoriesPanel: ButtonScore;

  footer: Footer;

  constructor(parentNode: HTMLElement, indexCategory: number) {
    super(parentNode, 'div', 'container', '');
    this.logo = new Logo(this.node);
    this.categoriesPanel = new ButtonScore(this.node, 'pictures');
    this.cardField = new ScoreCardField(this.node);
    this.footer = new Footer(this.node);
    this.indexCategory = indexCategory;
    this.isPictureCategory = true;
    this.setCard(this.indexCategory);
  }

  static async getData() {
    const response = await fetch('images.json');
    const categories = await response.json();
    return categories;
  }

  async setCard(indexCategory: number) {
    const splitArr = (arr: IImageModel[], chunks: number) => [
      ...Array(chunks),
    ].map((_, c) => arr.filter((n, index) => index % chunks === c));
    await ScorePicturePage.getData().then((res) => {
      const newQuestion = splitArr(res, 24).slice(12);
      return newQuestion;
    }).then((res) => res[indexCategory]).then((category) => {
      Object.values(category).map((cat: IImageModel) => {
        const card = new ScoreCard(
          this.cardField.node,
          cat,
          this.indexCategory,
          this.isPictureCategory,
        );
        return card;
      });
    });
  }
}
