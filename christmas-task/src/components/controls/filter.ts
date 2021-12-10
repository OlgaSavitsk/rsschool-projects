import Control from '../../common/control';
import Color from './color-controls/color';
import FavoriteContainer from './favorite/favorite-container';
import Shape from './shape-controls/shape';
import Size from './size-controls/size';

export default class Filter extends Control {

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'filters', '');
    this.node.innerHTML = `<h2 class="control-title">Фильтры по значению</h2>`
    const shapes = new Shape(this.node)
    const color = new Color(this.node)
    const size = new Size(this.node)
    const favorite = new FavoriteContainer(this.node)
  }
}