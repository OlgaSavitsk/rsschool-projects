import { COUNT_RANGE, FAVOURIRE, YEAR_RANGE } from '@/common/constants/constants';

interface IObj {
  [key: string]: string[] | string;
}

export interface IDefaultFilters extends Record<string, any> {
  shape: string[],
  color: string[],
  size: string[]
  count: string[],
  year: string[],
  favorite: string
}

export const defaultFilters: IDefaultFilters = {
  shape: ([] as string[]),
  color: ([] as string[]),
  size: ([] as string[]),
  count: COUNT_RANGE,
  year: YEAR_RANGE,
  favorite: FAVOURIRE,
};

interface IObjectKeys {
  [key: string]: string[];
}

interface FilterArr extends IObjectKeys {
  shape: string[],
  color: string[],
  size: string[]
}

export const filterArr: FilterArr = {
  shape: [],
  color: [],
  size: [],
};

interface IDefaultPosition {
  left: string,
  top: string
}

export const old: IDefaultPosition = {
  left: '',
  top: '',
};
