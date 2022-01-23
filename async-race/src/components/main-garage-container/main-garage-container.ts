import ApiWinner from '@/api/api-winners';
import Control from '@/common/components/control';
import { ICarData } from '@/models/car-model';
import GarageContainer from '../garage-container/garage-container';
import GarageControls from '../garage-controls/garage-controls';
import PaginationButtons from '../pagination/pagination-buttons';

export default class MainGarageContainer extends Control {
  public controls: GarageControls;

  public garageContainer: GarageContainer;

  public paginationButtons!: PaginationButtons;

  public isRace!: boolean;

  constructor(parentNode: HTMLElement, public data: ICarData, public apiWinner: ApiWinner) {
    super(parentNode, 'div', 'main-container', '');
    this.controls = new GarageControls(this.node);
    this.garageContainer = new GarageContainer(this.node, data, apiWinner, this.isRace);
    this.paginationButtons = new PaginationButtons(this.node);
    this.onRace();
    this.onReset();
  }

  private onRace(): void {
    this.controls.panelButtons.onRace = async () => {
      this.isRace = true;
      this.controls.panelButtons.resetButton.node.disabled = false;
      this.controls.panelButtons.raceButton.node.disabled = true;
      this.rerenderCar();
    };
  }

  private onReset(): void {
    this.controls.panelButtons.onReset = () => {
      this.isRace = false;
      this.controls.panelButtons.raceButton.node.disabled = false;
      this.controls.panelButtons.resetButton.node.disabled = true;
      this.rerenderCar();
    };
  }

  private rerenderCar(): void {
    this.garageContainer.destroy();
    this.paginationButtons.destroy();
    this.garageContainer = new GarageContainer(this.node, this.data, this.apiWinner, this.isRace);
    this.paginationButtons = new PaginationButtons(this.node);
  }
}
