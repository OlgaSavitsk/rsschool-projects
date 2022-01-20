import { ICar } from "./car-model";

export interface IWinner {
    time: any;
    name: string;
    color: string;
    id: string;
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