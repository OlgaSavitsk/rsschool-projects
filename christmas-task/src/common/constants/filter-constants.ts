interface IObj {
  [key: string]: string[] | string;
}

export enum Filters {
  shape,
  color,
  size,
  favorite,
}

const shapes: { [key: string]: string } = {
  ball: 'шар',
  bell: 'колокольчик',
  cone: 'шишка',
  snowflake: 'снежинка',
  toy: 'фигурка',
};

const colors: { [key: string]: string } = {
  white: 'белый',
  yellow: 'желтый',
  red: 'красный',
  blue: 'синий',
  green: 'зелёный',
};

const sizes: { [key: string]: string } = {
  big: 'большой',
  medium: 'средний',
  small: 'малый',
};

const favorite: { [key: string]: string } = {
  true: 'да',
  false: 'нет',
};

export const SHAPE_FILTER = { property: Filters.shape, value: shapes };
export const COLOR_FILTER = { property: Filters.color, value: colors };
export const SIZE_FILTER = { property: Filters.size, value: sizes };
export const FAVORITE_FILTER = { property: Filters.favorite, value: favorite };
