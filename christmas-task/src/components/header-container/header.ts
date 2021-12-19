import Control from '../../common/control';
import { IToysModel } from '../../models/toys-model';
import HeaderControls from './header-controls';
import Navigation from './navigation';

export default class Header extends Control {
  headerContainer: Control<HTMLElement>;
  headerControls: HeaderControls;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', 'header', '');
    this.headerContainer = new Control(this.node, 'div', 'container header-container', '')
    const navigation = new Navigation(this.headerContainer.node)
    this.headerControls = new HeaderControls(this.headerContainer.node)
  }
}