import { ICarData } from "@/models/car-model";
import { garage } from "../constants/api-constants";

export default class ApiServer  {
  //data!: ICarData;
  static data: ICarData;

  /* public async build() {
    ApiServer.data = await this.loadCarsData('1');
    return ApiServer.data;
  } */

  static async getCars(page: string, limit = 7): Promise<ICarData> {
    const queryParams: string[] = [
        `_page=${page}`,
        `_limit=${limit}`,
      ];
    const response = await fetch(`${garage}?${queryParams.join('&')}`)
    return {
        items: await response.json(),
        count: response.headers.get('X-Total-Count')
    }
  }

  async getCar(id: string) {
    await (await fetch(`${garage}/${id}`)).json()
  }

  async createCar(body: any) {
    (await fetch(garage, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      } 
    })).json()
  }

  async deleteCar(id: string) {
    (await fetch(`${garage}/${id}`, {
      method: 'DELETE'
    })).json()
  }

  async updateCar(id: string, body: any) {
    (await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      } 
    })).json()
  }

}