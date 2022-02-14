import { IDesk } from "@/models/select-model";

const RANGE_SLIDER = {
  count: 'count',
  year: 'year',
};

const COUNT_RANGE = ['1', '12'];
const YEAR_RANGE = ['1940', '2020'];
const FAVOURIRE = ['нет'];

const SORT_FILTER = {
  nameMax: 'nameMax',
  nameMin: 'nameMin',
  countMax: 'countMax',
  countMin: 'countMin',
};

const STORAGE_FAVOURITE_NAME = 'fovourite';
const STORAGE_FILTERS_NAME = 'filters';
const STORAGE_SETTINGS_NAME = 'settings';
const STORAGE_SELECT_NAME = 'select';

const MAX_FAVOURITE_COUNT = 20;
const FAVORITE_ERROR_MESSAGE = 'Извините, все слоты заполнены';
const DEFAULT_SCALE = 1.5;

const MAX_LIGHTS_COUNT = 300;
const LIGHT_SIZE = 10;
const LIGHTS_SPACING = 1.6;
const GARLAND_WIDTH = 400;
const GARLAND_HEIGTH = 400;
const SNOWFLAKE_INNER_WIDTH = 800;
const DELAY = 5;
const SNOWFLAKE_TIME_INTERVAL = 5;

type TreeCardBg = string[];

const treeCardBg = <TreeCardBg> ['1', '2', '3', '4', '5', '6'];

const desk: IDesk = {
  nameMax: false,
  nameMin: false,
  countMax: false,
  countMin: false,
  select: 'сортировать',
};

const settingaTree = {
  sound: false,
  snow: false,
  tree: '1',
  bg: '1',
};

export {
  STORAGE_FAVOURITE_NAME,
  STORAGE_FILTERS_NAME,
  STORAGE_SETTINGS_NAME,
  STORAGE_SELECT_NAME,
  RANGE_SLIDER,
  COUNT_RANGE,
  YEAR_RANGE,
  FAVOURIRE,
  SORT_FILTER,
  MAX_FAVOURITE_COUNT,
  FAVORITE_ERROR_MESSAGE,
  DEFAULT_SCALE,
  MAX_LIGHTS_COUNT,
  LIGHT_SIZE,
  LIGHTS_SPACING,
  GARLAND_WIDTH,
  GARLAND_HEIGTH,
  SNOWFLAKE_INNER_WIDTH,
  DELAY,
  SNOWFLAKE_TIME_INTERVAL,
  treeCardBg,
  desk,
  settingaTree
};
