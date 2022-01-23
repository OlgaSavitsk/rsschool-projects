import { ICar, ICarData } from '@/models/car-model';
import { IDrivingParam } from '@/models/engine-model';
import { IWinnerParam } from '@/models/winner-model';

export default class Race {
  private promises: Set<Promise<IDrivingParam>>;

  constructor(public carsData: ICarData) {
    this.promises = new Set();
  }

  private async raceAll(promises: Promise<IDrivingParam>[], ids: string[]): Promise<IWinnerParam> {
    const { success, id, time } = await Promise.race(promises);
    if (!success) {
      const failedIndex = ids.findIndex((i: any) => i === id);
      const promissesWithoutFailed = [
        ...promises.slice(0, failedIndex),
        ...promises.slice(failedIndex + 1, promises.length),
      ];
      const idsWithoutFailed = [
        ...ids.slice(0, failedIndex),
        ...ids.slice(failedIndex + 1, promises.length),
      ];
      return this.raceAll(promissesWithoutFailed, idsWithoutFailed);
    }
    const winner = this.carsData.items.find((car: ICar) => id === car.id);
    return { ...winner, time: +(time / 1000).toFixed(2) };
  }

  public async race(action: Promise<IDrivingParam>): Promise<IWinnerParam> {
    const winner = await this.raceAll(
      [...this.promises.add(action)],
      this.carsData.items.map((car) => car.id),
    );
    return winner;
  }
}
