import { IDesk } from '@/models/select-model';
import { IToysModel } from '@/models/toys-model';
import { SORT_FILTER } from '../constants/constants';

export default class SortServiceImplementaition {
  static sortToys(data: IToysModel[], sortFilter: IDesk): IToysModel[] {
    const desk = (sortFilter.nameMax || sortFilter.countMax) ? 1 : -1;
    this.sortByName(data, sortFilter, desk);
    this.sortByCount(data, sortFilter, desk);
    return data;
  }

  static sortByName(data: IToysModel[], sortFilter: IDesk, desk: number) {
    if (sortFilter.select === SORT_FILTER.nameMax || sortFilter.select === SORT_FILTER.nameMin) {
      const sorted = data
        .sort((a: IToysModel, b: IToysModel) => (a.name > b.name ? (1 * desk) : (-1 * desk)));
      return sorted;
    }
  }

  static sortByCount(data: IToysModel[], sortFilter: IDesk, desk: number) {
    if (sortFilter.select === SORT_FILTER.countMax || sortFilter.select === SORT_FILTER.countMin) {
      const sorted = data
        .sort(
          (
            a: IToysModel,
            b: IToysModel,
          ) => (Number(a.count) > Number(b.count) ? (1 * desk) : (-1 * desk)),
        );
      return sorted;
    }
  }
}
