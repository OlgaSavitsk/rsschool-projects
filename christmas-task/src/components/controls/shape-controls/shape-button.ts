import Control from '../../../common/control';

export default class ShapeButton extends Control {
  isChecked: boolean = false;

  constructor(parentNode: HTMLElement, shapeImage: string) {
    super(parentNode, 'button', '', '');
    this.node.style.backgroundImage = `url(./assets/svg/${shapeImage}.svg)`;
    this.node.setAttribute('data-filter', `${shapeImage}`)
  }
}