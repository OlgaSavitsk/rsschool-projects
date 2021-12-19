import { IToysModel } from "../models/toys-model"

 export class FilterController {
      public toys: IToysModel[] 

      constructor() {
          this.toys = []
      }
    
      add(value) {
        this.toys.push(value) 
      }

      remove(value) {
        this.toys = this.toys.filter((elem) => elem !== value);
      }

      emit(param: IToysModel) {
       // this.toys.forEach((toy) => toy.param);
      }
  }