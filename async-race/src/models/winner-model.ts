import { ICar } from "./car-model";

export interface IWinner {
    index: string,
    color: string,
    name: string,
    wins: string,
    time: string
}

export interface IWinnerModel {
        "id": string,
        "wins": number,
        "time": number,
        "car": ICar
}

export interface IWinnerData {
    items: IWinnerModel,
    count: string | null
}