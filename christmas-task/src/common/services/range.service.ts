import { IToysModel } from "../../models/toys-model";
import { Filters } from "../constants/filter-constants";

 export class RangeFilterService { 
      constructor() {}

      static rangeSort(filtersRangeObj: Filters, data: IToysModel[]): IToysModel[] {
        return data.filter(item => {
            return Object.keys(filtersRangeObj).every(propertyName => {
              console.log(item[propertyName], propertyName)
              if(filtersRangeObj[propertyName].length === 0) {
                return data
              } else
                  return +item[propertyName] >= +filtersRangeObj[propertyName][0] && +item[propertyName] <= +filtersRangeObj[propertyName][1]  
            });
          })
    }
  }