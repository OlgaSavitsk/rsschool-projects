interface IObj {
  [key: string]: boolean | string;
}

export interface IDesk extends IObj {
  nameMax: boolean,
  nameMin: boolean,
  countMax: boolean,
  countMin: boolean,
  select: string
}
