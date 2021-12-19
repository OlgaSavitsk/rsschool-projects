import Control from '../../common/control';
import FavoriteContainer from './favorite-control/favorite-container';
import Shape from './shape-controls/shape';
import Size from './size-controls/size';
import { Color } from './color-controls/color';

export default class Filter extends Control {
  shapes: Shape;
  colors: Color;
  sizes: Size;
  favorite: FavoriteContainer;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'filters', '');
    this.node.innerHTML = `<h2 class="control-title">Фильтры по значению</h2>`
    this.shapes = new Shape(this.node)
    this.colors = new Color(this.node)
    this.sizes = new Size(this.node)
    this.favorite = new FavoriteContainer(this.node)
  }
}