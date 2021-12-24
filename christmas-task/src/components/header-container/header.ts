import Control from '@/common/control';
import HeaderControls from './header-controls';
import Navigation from './navigation';

export default class Header extends Control {
  public headerContainer: Control<HTMLElement>;

  public headerControls: HeaderControls;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'header', 'header', '');
    this.headerContainer = new Control(this.node, 'div', 'container header-container', '');
    const navigation = new Navigation(this.headerContainer.node);
    this.headerControls = new HeaderControls(this.headerContainer.node);
  }
}
