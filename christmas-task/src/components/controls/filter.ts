import Control from '@/common/control';
import { IDefaultFilters } from '@/models/default-filter-model';
import Color from './color-controls/color';
import FavoriteContainer from './favorite-control/favorite-container';
import Shape from './shape-controls/shape';
import Size from './size-controls/size';

export default class Filter extends Control {
  public shapes: Shape;

  public colors: Color;

  public sizes: Size;

  public favorite: FavoriteContainer;

  constructor(parentNode: HTMLElement, filterStorage: IDefaultFilters) {
    super(parentNode, 'div', 'filters', '');
    this.node.innerHTML = '<h2 class="control-title">Фильтры по значению</h2>';
    this.shapes = new Shape(this.node, filterStorage);
    this.colors = new Color(this.node, filterStorage);
    this.sizes = new Size(this.node, filterStorage);
    this.favorite = new FavoriteContainer(this.node, filterStorage);
  }
}
