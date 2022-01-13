import { IToysModel } from '@/models/toys-model';

export default class SearchService {
  private dataValue: IToysModel[] = [];

  get data() {
    return this.dataValue;
  }

  set data(value) {
    this.dataValue = value;
  }

  public search(val: string): IToysModel[] {
    return this.data.filter((item) => {
      if (item.name.toLowerCase().includes(val)) {
        return item;
      }
      return false;
    });
  }
}
