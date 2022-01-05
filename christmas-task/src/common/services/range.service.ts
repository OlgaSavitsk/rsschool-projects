import { IToysModel } from '../../models/toys-model';
import { Filters } from '../constants/filter-constants';

export default class RangeFilterService {
  static rangeSort(filtersRangeObj: Filters, data: IToysModel[]): IToysModel[] {
    return data.filter((item) => Object.keys(filtersRangeObj).every((propertyName) => {
      if (filtersRangeObj[propertyName].length === 0) {
        return data;
      } return +item[propertyName] >= +filtersRangeObj[propertyName][0]
      && +item[propertyName] <= +filtersRangeObj[propertyName][1];
    }));
  }
}
