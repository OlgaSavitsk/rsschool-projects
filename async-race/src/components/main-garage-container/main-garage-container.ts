import Control from '@/common/components/control';
import { ICarData } from '@/models/car-model';
import GarageContainer from '../garage-container/garage-container';
import GarageControls from '../garage-controls/garage-controls';

export default class MainGarageContainer extends Control {
  controls: GarageControls;
  garageContainer: GarageContainer;

  constructor(parentNode: HTMLElement, public data: ICarData) {
    super(parentNode, 'div', 'main-container', '');
    this.controls = new GarageControls(this.node)
    this.garageContainer = new GarageContainer(this.node, data)
  }
}
