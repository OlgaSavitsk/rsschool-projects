import Control from "@/common/components/control";
import GenerateRandonCar from "@/utils/generate-random-car";
import { state } from "@/common/state";
import MainGarageContainer from "@/components/main-garage-container/main-garage-container";
import RouterButtons from "@/components/router-buttons/router-buttons";
import ApiGarage from "@/api/api-garage";
import ApiWinner from "@/api/api-winners";

export default class GaragePage extends Control {
  public mainGarageContainer!: MainGarageContainer;
  public apiWinner: ApiWinner;
  private generateRandomService: GenerateRandonCar;


  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    this.apiWinner = new ApiWinner() 
    this.generateRandomService = new GenerateRandonCar()
    const header = new RouterButtons(this.node) 
    this.carsRender();
  }

  private async carsRender(): Promise<void> {
    const data = await ApiGarage.getCars(state.carsPage);
    this.mainGarageContainer = new MainGarageContainer(this.node, data, this.apiWinner)
    this.createCar()
    this.removeCar()
    this.updateCar()
    this.paginationHandler()
    this.generateRandomCar()
  }

  private createCar(): void {
    this.mainGarageContainer.controls.formCreate.onCreateCar = async (name, color) => {
      ApiGarage.instence.createCar({name, color})
      this.rerenderCar()
    }
  }

  private removeCar(): void {
    this.mainGarageContainer.garageContainer.onRemoveCar = async (id) => {
      ApiGarage.instence.deleteCar(id)
      this.rerenderCar()
    }
  }

  private updateCar(): void {
    this.mainGarageContainer.garageContainer.onSelectCar = (car) => {
      this.mainGarageContainer.controls.formUpdate.inputUpdateName.node.value = car.name
      this.mainGarageContainer.controls.formUpdate.inputColor.node.value = car.color
      this.mainGarageContainer.controls.formUpdate.onUpdateCar = async (name, color) => {
        ApiGarage.instence.updateCar(car.id, {name, color})
        this.rerenderCar()
      }
    }
  }

  private paginationHandler(): void {
    this.mainGarageContainer.paginationButtons.onNextPage = async () => {
      state.carsPage = state.carsPage + 1
      this.rerenderCar()
    }
    this.mainGarageContainer.paginationButtons.onPrevPage = () => {
      if(state.carsPage === 1) {
        this.mainGarageContainer.paginationButtons.prevButton.node.disabled = true
      } else {
        state.carsPage = state.carsPage - 1
        this.rerenderCar()
      }
    }
  }

  private generateRandomCar(): void {
    this.mainGarageContainer.controls.panelButtons.onGenerateRandomCars = async () => {
      const cars = this.generateRandomService.generateRandomCar()
      await Promise.all(cars.map(async (car) => await ApiGarage.instence.createCar(car)))
      this.rerenderCar()
    }
  }

  private rerenderCar(): void {
    this.mainGarageContainer.destroy()
    this.carsRender()
  }
}
