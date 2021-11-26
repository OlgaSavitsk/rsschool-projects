import Control from '../common/control';
import ButtonCategories from '../components/button-categories/button-categories';
import CategoriesCard from '../components/cards/categories-card';
import CategoriesCardField from '../components/cards/categories-cardfield';
import Footer from '../components/footer/footer';
import Logo from '../components/logo/logo';
import { ICategoriesModel } from '../models/categories-model';
import QuestionsArtistPage from './question-artist-page';

export default class CategoriesPage extends Control {
  cardField: CategoriesCardField;

  newArr: string[];

  correctAnswerNumber!: string[];

  isUndefined!: boolean;

  questionsArtistPage!: QuestionsArtistPage;

  logo: Logo;

  categoriesPanel: ButtonCategories;

  footer: Footer;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container', '');
    this.logo = new Logo(this.node);
    this.categoriesPanel = new ButtonCategories(this.node, 'categories');
    this.cardField = new CategoriesCardField(this.node);
    this.footer = new Footer(this.node);
    this.newArr = [];
    this.start();
  }

  async start() {
    const response = await fetch('category-images.json');
    const categories: ICategoriesModel[] = await response.json();
    const [catAythor] = categories;
    const images = catAythor.images.map((name) => `${catAythor.category}/${name}`);
    images.map(async (url, index) => {
      const answer = await this.getLocalStorageAnswer(index);
      const card = new CategoriesCard(
        this.cardField.node,
        url,
        index + 1,
        catAythor.categories[index],
        answer!,
      );
      card.onChangeCategoryQuestions = () => {
        this.questionsArtistPage = new QuestionsArtistPage(this.node, index);
      };
      return card;
    });
  }

  async getLocalStorageAnswer(index: number): Promise<number | undefined> {
    try {
      const storageValue = JSON.parse(localStorage.getItem('answers')!) || [];
      this.correctAnswerNumber = storageValue[index];
      return this.correctAnswerNumber.length;
    } catch (err) {
      console.log(err);
    }
  }
}
