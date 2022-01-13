import { COUNT_RANGE, FAVOURIRE, YEAR_RANGE } from '@/common/constants/constants';

interface IObjectKeys {
  [key: string]: string[];
}

export interface IDefaultFilters extends IObjectKeys {
  shape: string[],
  color: string[],
  size: string[]
  count: string[],
  year: string[],
  favorite: string[]
}

export const defaultFilters: IDefaultFilters = {
  shape: [],
  color: [],
  size: [],
  count: COUNT_RANGE,
  year: YEAR_RANGE,
  favorite: [],
};

interface FilterArr extends IObjectKeys {
  shape: string[],
  color: string[],
  size: string[],
  favorite: string[]
}

export const filterArr: FilterArr = {
  shape: [],
  color: [],
  size: [],
  favorite: [],
};

interface IDefaultPosition {
  left: string,
  top: string
}

export const old: IDefaultPosition = {
  left: '',
  top: '',
};
