import Control from '@/common/components/control';
import { ICarData } from '@/models/car-model';
import GarageContainer from '../garage-container/garage-container';
import GarageControls from '../garage-controls/garage-controls';
import PaginationButtons from '../pagination/pagination-buttons';


export default class MainGarageContainer extends Control {
  public controls: GarageControls;
  public garageContainer: GarageContainer;
  public paginationButtons!: PaginationButtons;
  public isRace: boolean = false;


  constructor(parentNode: HTMLElement, public data: ICarData) {
    super(parentNode, 'div', 'main-container', '');
    this.controls = new GarageControls(this.node)
    this.garageContainer = new GarageContainer(this.node, data, this.isRace)
    this.onRace()
    this.onReset()
  }

  onRace() {
    this.paginationButtons = new PaginationButtons(this.node)
    this.controls.panelButtons.onRace = async () => {
      this.isRace = !this.isRace
      this.controls.panelButtons.resetButton.node.disabled = false 
      this.controls.panelButtons.raceButton.node.disabled = true 
      this.garageContainer.destroy()
      this.paginationButtons.destroy()
      this.garageContainer = new GarageContainer(this.node, this.data, this.isRace)
      this.onRace()
    }
  }

  onReset() {
    //this.paginationButtons = new PaginationButtons(this.node)
    this.controls.panelButtons.onReset = () => {
      this.isRace = !this.isRace
      this.controls.panelButtons.raceButton.node.disabled = false 
      this.controls.panelButtons.resetButton.node.disabled = true
      this.garageContainer.destroy()
      this.paginationButtons.destroy()
      this.garageContainer = new GarageContainer(this.node, this.data, this.isRace)
    }
  }
}
