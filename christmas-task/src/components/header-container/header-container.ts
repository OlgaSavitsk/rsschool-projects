import Control from '../../common/control';
import HeaderControls from './header-controls';
import Navigation from './navigation';

export default class HeaderContainer extends Control {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'container header-container', '');
    const navigation = new Navigation(this.node)
    const headerControls = new HeaderControls(this.node)
  }
}