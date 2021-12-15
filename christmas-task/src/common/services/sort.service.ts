import { IDesk, IToysModel } from '../../models/toys-model';

export interface SortService {
  transform(value: IToysModel[], isDesk: boolean): IToysModel[]
}

export default class SortServiceImplementaition {

    constructor() {
    }

    static transformByName(value: IToysModel[], isDeskByName: IDesk): IToysModel[] {
      if (isDeskByName.isDeskName !== undefined) {
          let dm = isDeskByName.isDeskName ? 1 : -1
          const sorted = value.sort((a, b) => {
              const cur = a.name[0];
              const prev = b.name[0];
              return cur > prev ? (1*dm) : (-1*dm)
            });
          return sorted;
        }
      if (isDeskByName.isDeskCount !== undefined) {
        let am = isDeskByName.isDeskCount ? 1 : -1
        const sortedCount = value.sort((a, b) => {
            const cur = +a.count;
            const prev = +b.count;
            return cur > prev ? (1*am) : (-1*am)
          });   
        return sortedCount;
      }
      return value;
    }
}