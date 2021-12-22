import { IToysModel } from "../../models/toys-model";

 export class FilterService { 
      constructor() {}

      static sort({property, value}, param: string, data: IToysModel[]): IToysModel[] {
        if(!property || !value) {
            return []
        }
        if(Object.keys(value).includes(param)) {
            var sorted = data.filter((item: IToysModel) => item[property] === value[param]) 
            return sorted
        }
        return data
    }
  }