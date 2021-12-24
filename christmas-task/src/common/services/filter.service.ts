import { IDefaultFilters } from '@/models/default-filter-model';
import { IToysModel } from '@/models/toys-model';

export default class FilterService {
  constructor() {}

  public sort = ({ property, value }, param: string, data: IToysModel[]): IToysModel[] => {
    if (!property || !value) {
      return [];
    }
    if (Object.keys(value).includes(param)) {
      const sorted = data.filter((item: IToysModel) => item[property] === value[param]);
      return sorted;
    }
    return data;
  };

  static getFilterData(defaultFilters: IDefaultFilters, data: IToysModel[]) {
    return data.filter((item) => Object.keys(defaultFilters).every((propertyName) => {
      if (defaultFilters[propertyName].length === 0) {
        return data;
      }
      if (propertyName === 'count' || propertyName === 'year') {
        return +item[propertyName] >= +defaultFilters[propertyName][0]
        && +item[propertyName] <= +defaultFilters[propertyName][1];
      }
      if (defaultFilters[propertyName].length > 1) {
        return defaultFilters[propertyName].includes(item[propertyName]);
      }
      return item[propertyName].indexOf(defaultFilters[propertyName]) > -1;
    }));
  }
}
