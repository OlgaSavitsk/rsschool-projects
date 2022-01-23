import Control from '@/common/components/control';
import Race from '@/utils/race';
import { ICar, ICarData } from '@/models/car-model';
import CarContainer from '../car-container/car-container';
import ModalWinner from '../modal-winner/modal-winner';
import ApiWinner from '@/api/api-winners';
import state from '@/common/state';

export default class GarageContainer extends Control {
  public carContainer!: CarContainer;

  private race!: Race;

  private modal!: ModalWinner;

  private timeArr: number[] = [];

  public onRemoveCar!: (id: string) => void;

  public onSelectCar!: (id: ICar) => void;

  constructor(
    parentNode: HTMLElement,
    public data: ICarData,
    public apiWinner: ApiWinner,
    public isRace?: boolean,
  ) {
    super(parentNode, 'div', 'garage-container', '');
    this.race = new Race(this.data);
    this.node.innerHTML = `<h2 class="title">Garage (${data.count})</h1>
    <h3 class="subtitle">Page #${state.carsPage}</h2>`;
    this.renderCars();
  }

  private renderCars(): void {
    Object.values(this.data.items).map(async (car: ICar) => {
      this.carContainer = new CarContainer(this.node, this.data, car);
      this.setEventListener(car);
      this.driveAllCarsAndGetWinner(car);
      this.toStartCarsPosition(car);
    });
  }

  private setEventListener(car: ICar): void {
    this.carContainer.settingsButton.removeButton.node.onclick = () => {
      this.onRemoveCar(car.id);
    };
    this.carContainer.settingsButton.selectButton.node.onclick = () => {
      this.onSelectCar(car);
    };
  }

  private async driveAllCarsAndGetWinner(car: ICar): Promise<void> {
    if (this.isRace === true) {
      const action = this.carContainer.carControl.car.car.startDriving(car.id);
      const winner = await this.race.race(action);
      this.timeArr.push(winner.time);
      if (this.timeArr.length === 1) {
        this.modal = new ModalWinner(this.node, `${winner.name} went first ${winner.time} s`);
        this.modal.onClick = () => this.modal.destroy();
        await this.apiWinner.saveWinner({ id: winner.id, time: winner.time });
      }
    }
  }

  private async toStartCarsPosition(car: ICar): Promise<void> {
    if (this.isRace === false) {
      await this.carContainer.carControl.car.car.stopDriving(car.id);
    }
  }
}
