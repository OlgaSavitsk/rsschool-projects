import Control from '../../common/control';
import Filter from '../controls/filter/filter';

export default class ToysMainContainer extends Control {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    const filter = new Filter(this.node)
  }
}