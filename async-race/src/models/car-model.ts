export interface ICar {
    name: string,
    color: string,
    id: string
}

export interface ICarData {
    items: ICar[],
    count: string | null
}

export interface ICarCenterPosition {
    x: number,
    y: number
  }
  