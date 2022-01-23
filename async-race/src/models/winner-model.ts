import { ICar } from './car-model';

export interface IWinner {
  id: string | undefined,
  wins: number,
  time: number,
}

export interface IWinnerModel {
  car: ICar
  id: string,
  wins: number,
  time: number,
}

export interface IWinnerData {
  items: IWinnerModel[],
  count: string | null
}

export interface IWinnerParam {
  color?: string,
  name?: string,
  id?: string,
  time: number
}
