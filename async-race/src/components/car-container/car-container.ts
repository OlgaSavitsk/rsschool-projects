import Control from "@/common/components/control";
import { ICar, ICarData } from "@/models/car-model";
import CarControl from "./car-control";
import Car from "./car-control";
import SettingsButtons from "./settings-button";

export default class CarContainer extends Control {
    public settingsButton: SettingsButtons;
    public carControl: CarControl;
  
    constructor(parentNode: HTMLElement, public data: ICarData, public car: ICar) {
      super(parentNode, 'div', 'car-container', '');
      this.settingsButton = new SettingsButtons(this.node, car)
      this.carControl = new CarControl(this.node, car)
     /*  this.favouriteStorage = new StorageService();
      this.favouriteStorage.loadFromLocalStorage(STORAGE_FAVOURITE_NAME);
      this.renderCard(); */
    }
  
    /* private renderCard(): void {
      this.data.map((toy: IToysModel) => {
        this.card = new Card(this.node, toy);
        this.addToFavoriteCard(toy);
        return false;
      });
    } */
}