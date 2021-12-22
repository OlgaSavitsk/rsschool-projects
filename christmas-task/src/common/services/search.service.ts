import { IToysModel } from "../../models/toys-model";

 export class SearchService {
     static data: IToysModel[];
     static searchValueArr: IToysModel[] = []

      constructor(data: IToysModel[]) {
        SearchService.data = data
      }

    static search(val) {
        const filterVal = SearchService.data.filter(item => {
            if(item.name.toLowerCase().includes(val)) {
                return item
            }
        })
        return filterVal
    }
  }