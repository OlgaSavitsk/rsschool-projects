import ApiServer from "@/common/api/api";
import ApiWinnersServer from "@/common/api/api-winnwrs";
import Control from "@/common/components/control";
import { state } from "@/common/state";
import Footer from "@/components/footer/footer";
import MainGarageContainer from "@/components/main-garage-container/main-garage-container";
import RouterButtons from "@/components/router-buttons/router-buttons";
import { ICarData } from "@/models/car-model";

export default class GaragePage extends Control {
  public mainGarageContainer!: MainGarageContainer;
  private api: ApiServer;
  private footer!: Footer;
  private apiWinner: ApiWinnersServer;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'page-container main-page', '');
    const header = new RouterButtons(this.node) 
    this.api = new ApiServer() 
    this.apiWinner = new ApiWinnersServer() 
    this.carsRender();
  }

  private async carsRender(): Promise<void> {
    const data = await ApiServer.getCars(state.carsPage);
    console.log(data)
    this.mainGarageContainer = new MainGarageContainer(this.node, data)
    this.footer = new Footer(this.node);
    this.mainGarageContainer.controls.formCreate.onCreateCar = async (name, color) => {
      this.api.createCar({name, color})
      this.mainGarageContainer.destroy()
      this.footer.destroy()
      this.carsRender()
    }
    this.mainGarageContainer.garageContainer.onRemoveCar = async (id) => {
      this.api.deleteCar(id)
      this.apiWinner.deleteCar(id)
      this.mainGarageContainer.destroy()
      this.footer.destroy()
      this.carsRender()
    }
    this.mainGarageContainer.garageContainer.onSelectCar = async (car) => {
      this.mainGarageContainer.controls.formUpdate.inputUpdateName.node.value = car.name
      this.mainGarageContainer.controls.formUpdate.inputColor.node.value = car.color
      this.mainGarageContainer.controls.formUpdate.onUpdateCar = async (name, color) => {
        this.api.updateCar(car.id, {name, color})
        this.mainGarageContainer.destroy()
        this.footer.destroy()
        this.carsRender()
      }
    }
   
  }
}
