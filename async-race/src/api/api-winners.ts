import { IWinner, IWinnerData } from '@/models/winner-model';
import { winners } from '../common/constants/api-constants';
import ApiGarage from './api-garage';

export interface IWinnerOptions {
  page: number,
  limit?: number,
  sort?: string,
  order?: string
}

export default class ApiWinner {
  public getSortOrder({ sort, order }: { sort?: string, order?: string }): string {
    if (sort && order) return `&_sort=${sort}&_order=${order}`;
    return '';
  }

  public async getWinners({
    page, limit = 10, sort, order,
  }: IWinnerOptions): Promise<IWinnerData> {
    const response = await fetch(`${winners}?_page=${page}&_limit=${limit}${this.getSortOrder({ sort, order })}`);
    const items = await response.json();
    return {
      items: await Promise.all(items
        .map(async (winner: any) => ({ ...winner, car: await ApiGarage.getCar(winner.id) }))),
      count: response.headers.get('X-Total-Count'),
    };
  }

  public async getWinner(id: string | undefined): Promise<IWinner> {
    return (await fetch(`${winners}/${id}`)).json();
  }

  public async getWinnerStatus(id: string | undefined): Promise<number> {
    return (await fetch(`${winners}/${id}`)).status;
  }

  public async deleteCar(id: string): Promise<void> {
    (await fetch(`${winners}/${id}`, {
      method: 'DELETE',
    })).json();
  }

  public async createWinner(body: IWinner): Promise<IWinner> {
    const response = await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 500) {
      throw new Error('Error: Insert failed, duplicate id');
    }
    return response.json();
  }

  async updateWinner(id: string | undefined, body: IWinner): Promise<void> {
    (await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })).json();
  }

  async saveWinner({ id, time } : { id: string | undefined, time: number }): Promise<void> {
    const winnerStatus = await this.getWinnerStatus(id);
    if (winnerStatus === 404) {
      await this.createWinner({ id, wins: 1, time });
    } else {
      const winner = await this.getWinner(id);
      await this.updateWinner(id, {
        id,
        wins: winner.wins + 1,
        time: time < winner.time ? time : winner.time,
      });
    }
  }
}
