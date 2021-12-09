import Control from '../../common/control';
import Logo from '../logo/logo';

export default class Navigation extends Control {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'nav', '', '');
    const logo = new Logo(this.node)
    this.node.insertAdjacentHTML('beforeend', `<a href="#toys" class="nav-link">игрушки</a>
      <a href="#tree" class="nav-link">ёлка</a>`);
  }
}