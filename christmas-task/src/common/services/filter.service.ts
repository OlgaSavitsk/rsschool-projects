import { IDefaultFilters } from '@/models/default-filter-model';
import { IToysModel } from '@/models/toys-model';
import { RANGE_SLIDER } from '../constants/constants';

export default class FilterService {
  static getFilterData(defaultFilters: IDefaultFilters, data: IToysModel[]): IToysModel[] {
    return data.filter((item: IToysModel) => Object.keys(defaultFilters).every((propertyName) => {
      if (defaultFilters[propertyName].length === 0) {
        return data;
      }
      if (propertyName === RANGE_SLIDER.count || propertyName === RANGE_SLIDER.year) {
        return Number(item[propertyName]) >= Number(defaultFilters[propertyName][0])
      && Number(item[propertyName]) <= Number(defaultFilters[propertyName][1]);
      }
      if (defaultFilters[propertyName].length > 1) {
        return defaultFilters[propertyName].includes(item[propertyName]);
      }
      return (item[propertyName] as string).indexOf(defaultFilters[propertyName]) > -1;
    }));
  }
}
