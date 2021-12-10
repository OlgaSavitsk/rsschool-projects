import Control from '../../../common/control';
import CountSlider from './count-slider';

export default class Count extends Control {
  countSlider: CountSlider;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'count', '');
    this.node.innerHTML = `<span class="control-span">Количество экземпляров :</span>`
    this.countSlider = new CountSlider(this.node)
  }
}