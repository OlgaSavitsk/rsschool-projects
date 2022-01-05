import Control from '@/common/components/control';

export default class ShapeButton extends Control {
  constructor(parentNode: HTMLElement, shapeImage: string) {
    super(parentNode, 'button', '', '');
    this.node.style.backgroundImage = `url(./svg/${shapeImage}.svg)`;
    this.node.setAttribute('data-filter', `${shapeImage}`);
  }
}
