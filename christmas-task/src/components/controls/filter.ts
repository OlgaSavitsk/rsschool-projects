import Control from '../../common/control';
import { IToysModel } from '../../models/toys-model';
import Color from './color-controls/color';
import FavoriteContainer from './favorite/favorite-container';
import Shape from './shape-controls/shape';
import Size from './size-controls/size';

export default class Filter extends Control {
  shapes: Shape;
  color: Color;
  size: Size;

  constructor(parentNode: HTMLElement, data: IToysModel[]) {
    super(parentNode, 'div', 'filters', '');
    this.node.innerHTML = `<h2 class="control-title">Фильтры по значению</h2>`
    this.shapes = new Shape(this.node)
    this.color = new Color(this.node)
    this.size = new Size(this.node)
    const favorite = new FavoriteContainer(this.node)
    this.shapes.onSort=() => {
      this.filtrByShape(data)
    }
  }

  filtrByShape(value: IToysModel[]): IToysModel[] {
    const sorted = value.filter(item => {
        return item.shape === 'шар'
      })
      console.log(sorted)
    return sorted
  } 
}