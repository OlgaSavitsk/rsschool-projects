import { ICar } from "@/models/car-model";
import { IWinnerData } from "@/models/winner-model";
import { garage, winners } from "../common/constants/api-constants";

export interface IWinnerOptions {
  page: string,
  limit?: number,
  sort?: string,
  order?: string
}

export default class ApiWinnersServer  {
  public data!: IWinnerData;

  getSortOrder(sort: any, order: any): string {
    if (sort & order) return `&_sort=${sort}&_order=${order}` 
    return ''
  }

  async getWinners({page, limit = 10, sort, order}: IWinnerOptions): Promise<any> {
      const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${this.getSortOrder(sort, order)}`)
      const items = await response.json()
      return {
        items: await Promise.all(items.map(async (winner: any) => ({...winner, car: await this.getCar(winner.id)}))),
        count: response.headers.get('X-Total-Count')
      }
  }

 /*  public async getWinners(): Promise<IWinnerData> {
    this.data = await this.loadWinnersData({page: state.winnersPage, limit: 10, sort: state.sortBy, order: state.sortOrder});
    return this.data;
  } */

  async getCar(id: string): Promise<ICar> {
    return (await fetch(`${garage}/${id}`)).json()
  }

  async getWinner(id: string) {
    return (await fetch(`${winners}/${id}`)).json()
  }

  async getWinnerStatus(id: string) {
    return (await fetch(`${winners}/${id}`)).status
  }

  async deleteCar(id: string) {
    (await fetch(`${winners}/${id}`, {
      method: 'DELETE'
    })).json()
  }

  async createWinner(body: any) {
    (await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      } 
    })).json()
  }

  async updateWinner(id: string, body: any) {
    (await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json'
      } 
    })).json()
  }

  async saveWinner({id, time} : { id: string, time: number}): Promise<any> {
      const winnerStatus = await this.getWinnerStatus(id)
      if(winnerStatus === 404) {
        await this.createWinner({ id, wins: 1, time})
      } else {
        const winner = await this.getWinner(id)
        await this.updateWinner(id, {
          id,
          wins: winner.wins + 1,
          time: time < winner.time ? time : winner.time 
        })
      }
  }

}