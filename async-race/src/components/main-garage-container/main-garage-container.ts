import Control from '@/common/components/control';
import { ICarData } from '@/models/car-model';
import GarageContainer from '../garage-container/garage-container';
import GarageControls from '../garage-controls/garage-controls';
import PaginationButtons from '../pagination/pagination-buttons';

export default class MainGarageContainer extends Control {
  public controls: GarageControls;
  public garageContainer: GarageContainer;
  public paginationButtons: PaginationButtons;

  constructor(parentNode: HTMLElement, public data: ICarData) {
    super(parentNode, 'div', 'main-container', '');
    this.controls = new GarageControls(this.node)
    this.garageContainer = new GarageContainer(this.node, data)
    this.paginationButtons = new PaginationButtons(this.node)
  }
}
