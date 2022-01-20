import ApiWinnersServer from '@/api/api-winners';
import Control from '@/common/components/control';
import { state } from '@/common/state';
import Race from '@/utils/race';
import { ICar, ICarData } from '@/models/car-model';
import CarContainer from '../car-container/car-container';
import ModalWinner from '../modal-winner/modal-winner';

export default class GarageContainer extends Control {
  public carContainer!: CarContainer;
  public onRemoveCar!: (id: string) => void
  public onSelectCar!: (id: ICar) => void
  private race!: Race;
  private apiWinner!: ApiWinnersServer;
  private modal!: ModalWinner;
  timeArr: string[] = []

  
  constructor(parentNode: HTMLElement, public data: ICarData, public isRace?: boolean/* , public isReset?: boolean */) {
    super(parentNode, 'div', 'garage-container', '');
    this.race = new Race(this.data)  
    this.apiWinner = new ApiWinnersServer() 
    this.node.innerHTML = `<h2 class="title">Garage (${data.count})</h1>
    <h3 class="subtitle">Page #${state.carsPage}</h2>`  
    this.renderCars()
  }

  renderCars() {
    Object.values(this.data.items).map(async (car: ICar) => {
      this.carContainer = new CarContainer(this.node, this.data, car)
      this.carContainer.settingsButton.removeButton.node.onclick = () => {
        this.onRemoveCar(car.id)
      }
      this.carContainer.settingsButton.selectButton.node.onclick = () => {
        this.onSelectCar(car)
      }     
      if(this.isRace === true) { 
        const winner = await this.race.race(this.carContainer.carControl.car.car.startDriving(car.id))
        this.timeArr.push(winner.time)
        const minTime = this.timeArr.reduce((a, b) => Math.min(+a, +b).toString())
        if(winner.time === minTime) {
          console.log('win', winner)
          this.modal = new ModalWinner(this.node, `${winner.name} went first ${winner.time} s`)
          this.modal.onClick = () => this.modal.destroy()
          await this.apiWinner.saveWinner(winner)
        } 
      } 
      if(this.isRace === false) { 
        await this.carContainer.carControl.car.car.stopDriving(car.id)
      }
    })
  }
}