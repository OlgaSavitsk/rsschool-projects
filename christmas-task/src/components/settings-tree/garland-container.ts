import Control from '@/common/components/control';
import GarlandBtns from './garland-btns';
import SwitchButton from './switch-button';

export default class GarlandContainer extends Control {
  garlandBtns: GarlandBtns;

  switchButton: SwitchButton;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'garland-container menu-container', '');
    this.garlandBtns = new GarlandBtns(this.node);
    this.switchButton = new SwitchButton(this.node);
  }
}
