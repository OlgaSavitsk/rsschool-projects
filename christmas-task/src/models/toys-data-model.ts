import { IToysModel } from "./toys-model";

export class ToysDataModel {
  data!: Array<IToysModel>
    constructor() {}

    public async build(): Promise<IToysModel[]> {
        this.data = await this.loadToysData('toys.json')
        return this.data
    } 

    loadToysData(url: string) {
      return fetch(url).then(res => res.json()).then((toysData: any) => {
        const modelData = Object.keys(toysData).map(item => {
          const toy = toysData[item];
          return toy;
        });
        return modelData;
      })
    }

    getData() {
      return this.data
    }
}