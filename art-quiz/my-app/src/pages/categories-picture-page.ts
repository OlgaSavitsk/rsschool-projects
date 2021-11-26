import Control from '../common/control';
import ButtonCategories from '../components/button-categories/button-categories';
import Footer from '../components/footer/footer';
import Logo from '../components/logo/logo';
import PictureCategoriesCard from '../components/picture category-card/picture-category-card';
import PictureCategoriesCardField from '../components/picture category-card/picture-category-cardfield';
import { ICategoriesModel } from '../models/categories-model';
import QuestionsPicturesPage from './question-pictures-page';

export default class CategoriesPicturesPage extends Control {
  newArr: string[];

  correctAnswerNumber!: any;

  cat: any;

  isUndefined!: boolean;

  pictureCardField: PictureCategoriesCardField;

  logo: Logo;

  categoriesPanel: ButtonCategories;

  footer: Footer;

  questionsPicturesPage!: QuestionsPicturesPage;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container', '');
    this.logo = new Logo(this.node);
    this.categoriesPanel = new ButtonCategories(this.node, 'categories');
    this.pictureCardField = new PictureCategoriesCardField(this.node);
    this.footer = new Footer(this.node);
    this.newArr = [];
    this.start();
  }

  async start() {
    const response = await fetch('category-images.json');
    const categories: ICategoriesModel[] = await response.json();
    const [, catPicture] = categories;
    const images = catPicture.images.map((name) => `${catPicture.category}/${name}`);
    images.map(async (url, index) => {
      const answer = await this.getLocalStorageAnswer(index);
      const card = new PictureCategoriesCard(
        this.pictureCardField.node,
        url,
        index + 1,
        catPicture.categories[index],
        answer!,
      );
      card.onChangeCategoryQuestions = () => {
        this.questionsPicturesPage = new QuestionsPicturesPage(this.node, index);
      };
    });
  }

  async getLocalStorageAnswer(index: number): Promise<number | undefined> {
    try {
      const storageValuePicture = JSON.parse(localStorage.getItem('answers-picture')!) || [];
      this.correctAnswerNumber = storageValuePicture[index];
      return this.correctAnswerNumber.length;
    } catch (err) {
      console.log(err);
    }
  }
}
