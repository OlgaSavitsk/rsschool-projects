import ApiServer from "@/api/api-garage";
import ApiWinnersServer from "@/api/api-winners";
import Control from "@/common/components/control";
import GenerateRandonCar from "@/utils/generate-random-car";
import { state } from "@/common/state";
import Footer from "@/components/footer/footer";
import MainGarageContainer from "@/components/main-garage-container/main-garage-container";
import RouterButtons from "@/components/router-buttons/router-buttons";

export default class GaragePage extends Control {
  public mainGarageContainer!: MainGarageContainer;
  private api: ApiServer;
  private apiWinner: ApiWinnersServer;
  generateRandomService: GenerateRandonCar;


  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    this.api = new ApiServer() 
    this.apiWinner = new ApiWinnersServer() 
    this.generateRandomService = new GenerateRandonCar()
    const header = new RouterButtons(this.node) 
    this.carsRender();
  }

  private async carsRender(): Promise<void> {
    const data = await ApiServer.getCars(state.carsPage);
    const mainGarageContainer = new MainGarageContainer(this.node, data)
    mainGarageContainer.controls.formCreate.onCreateCar = async (name, color) => {
      this.api.createCar({name, color})
      mainGarageContainer.destroy()
      this.carsRender()
    }
    mainGarageContainer.garageContainer.onRemoveCar = async (id) => {
      this.api.deleteCar(id)
      this.apiWinner.deleteCar(id)
      mainGarageContainer.destroy()
      this.carsRender()
    }
    mainGarageContainer.garageContainer.onSelectCar = async (car) => {
      mainGarageContainer.controls.formUpdate.inputUpdateName.node.value = car.name
      mainGarageContainer.controls.formUpdate.inputColor.node.value = car.color
      mainGarageContainer.controls.formUpdate.onUpdateCar = async (name, color) => {
        this.api.updateCar(car.id, {name, color})
        mainGarageContainer.destroy()
        this.carsRender()
      }
    }
    mainGarageContainer.paginationButtons.onNextPage = () => {
      console.log('next')
      state.carsPage = (+state.carsPage + 1).toString()
      mainGarageContainer.destroy()
        this.carsRender()
    }
    mainGarageContainer.paginationButtons.onPrevPage = () => {
      console.log('next')
      state.carsPage = (+state.carsPage - 1).toString()
      mainGarageContainer.destroy()
        this.carsRender()
    }
    mainGarageContainer.controls.panelButtons.onGenerateRandomCars = async () => {
      const cars = this.generateRandomService.generateRandomCar()
      await Promise.all(cars.map(async (car) => await this.api.createCar(car)))
      mainGarageContainer.destroy()
      this.carsRender()
    }
  }
}
