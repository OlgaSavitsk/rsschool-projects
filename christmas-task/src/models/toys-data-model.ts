import { IToysModel } from './toys-model';

export default class ToysDataModel {
  data!: Array<IToysModel>;

  constructor() {}

  public async build(): Promise<IToysModel[]> {
    this.data = await this.loadToysData('toys.json');
    return this.data;
  }

  loadToysData = async (url: string): Promise<IToysModel[]> => {
    const response: Response = await fetch(url);
    const toysData: IToysModel[] = await response.json();
    const modelData = Object.keys(toysData).map((key: string) => {
      const toy = toysData[key];
      return toy;
    });
    return modelData;
  };

  public getData(): IToysModel[] {
    return this.data;
  }
}
