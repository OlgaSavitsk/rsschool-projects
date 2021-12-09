import Control from '../../common/control';
import HeaderContainer from '../header-container/header-container';

export default class Header extends Control {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', 'header', '');
    const headerContainer = new HeaderContainer(this.node)
    this.node.onclick = () => {
      //this.onToggleToHome();
    };
  }
}