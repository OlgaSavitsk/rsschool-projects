import { ICar } from "@/models/car-model";
import { LETTERS, MODELS_CAR, NAMES_CAR } from "../constants/constants";

export default class GenerateRandonCar {
    constructor() {}

    private generateCarName(): string {
        const model = MODELS_CAR[Math.floor(Math.random() * MODELS_CAR.length)];
        const name = NAMES_CAR[Math.floor(Math.random() * MODELS_CAR.length)];
        return `${model}${name}`;
      }

      private generateCarColor(): string {  
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += LETTERS[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      public generateRandomCar(count = 100): ICar[] {
        return new Array(count).fill(1).map(_ => ({
          name: this.generateCarName(),
          color: this.generateCarColor(),
          id: ''
        }));
      }
}