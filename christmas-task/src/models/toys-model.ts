interface IToysKeys {
  [key: string]: string | boolean;
}

export interface IToysModel extends IToysKeys {
  num: string,
  name: string,
  count: string,
  year: string,
  shape: string,
  color: string,
  size: string,
  favorite: boolean
}

interface IObjectKeys {
  [key: string]: IToysModel;
}

export interface IToysData extends IObjectKeys {
  index: IToysModel
}
