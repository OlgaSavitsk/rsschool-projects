import Control from '@/common/components/control';
import { state } from '@/common/state';
import { ICar, ICarData } from '@/models/car-model';
import CarContainer from '../car-container/car-container';

export default class GarageContainer extends Control {
  carContainer!: CarContainer;
  public onRemoveCar!: (id: string) => void
  public onSelectCar!: (id: ICar) => void

  constructor(parentNode: HTMLElement, public data: ICarData) {
    super(parentNode, 'div', 'garage-container', '');
    this.node.innerHTML = `<h2 class="title">Garage (${data.count})</h1>
    <h3 class="subtitle">Page #${state.carsPage}</h2>`  
    this.renderCars()
  }

  renderCars() {
    Object.values(this.data.items).map((car: ICar) => {
      this.carContainer = new CarContainer(this.node, this.data, car)
      this.carContainer.settingsButton.removeButton.node.onclick = () => {
        this.onRemoveCar(car.id)
      }
      this.carContainer.settingsButton.selectButton.node.onclick = () => {
        this.onSelectCar(car)
      }
    })
  }
}