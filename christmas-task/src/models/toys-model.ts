export interface IToysModel {
    num: string,
    name: string,
    count: string,
    year: string,
    shape: string,
    color: string,
    size: string,
    favorite: boolean
}

export interface IDesk {
    isDeskName: boolean | undefined,
    isDeskCount: boolean | undefined
    select: string
  }

  export const desk: IDesk = {
    isDeskName: false,
    isDeskCount: false,
    select: ''
  } 