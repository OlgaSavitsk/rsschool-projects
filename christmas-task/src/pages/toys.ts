import Control from '../common/control';
import MainToysContainer from '../components/main-toys-container/main-toys-container';

export default class Toys extends Control {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    const container = new MainToysContainer(this.node)
  }
}
