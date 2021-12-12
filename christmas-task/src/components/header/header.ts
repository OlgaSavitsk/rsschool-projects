import Control from '../../common/control';
import HeaderContainer from '../header-container/header-container';

export default class Header extends Control {
  headerContainer: HeaderContainer;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', 'header', '');
    this.headerContainer = new HeaderContainer(this.node)
  }
}