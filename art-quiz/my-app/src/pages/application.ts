import Control from '../common/control';
import CategoriesCard from '../components/cards/categories-card';
import Categories from '../components/categories/categories';
import Footer from '../components/footer/footer';
import HeaderQuestions from '../components/header-questions/header-questions';
import Logo from '../components/logo/logo';

export default class Application extends Control {
  private buttonSettings: Control<HTMLButtonElement>;

  categoryCards!: CategoriesCard;

  headerQuestions!: HeaderQuestions;

  logo: Logo;

  categories: Categories;

  footer: Footer;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container', '');
    this.logo = new Logo(this.node);
    this.categories = new Categories(this.node);
    this.buttonSettings = new Control(this.node, 'button', 'settings', '');
    this.buttonSettings.node.innerHTML = `
            <a class="settings link" href="#setting">
            <span class="settings-icon set"></span>settings
            </a>`;
    this.footer = new Footer(this.node);
  }
}
