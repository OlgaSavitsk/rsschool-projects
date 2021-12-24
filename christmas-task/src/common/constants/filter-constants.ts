export enum Filters {
  shape,
  color,
  size,
  favorite,
}

enum Shapes {
  ball = 'шар',
  bell = 'колокольчик',
  cone = 'шишка',
  snowflake = 'снежинка',
  toy = 'фигурка',
}

enum Colors {
  white = 'белый',
  yellow = 'желтый',
  red = 'красный',
  blue = 'синий',
  green = 'зелёный',
}

enum Sizes {
  big = 'большой',
  medium = 'средний',
  small = 'малый',
}

enum Favorite {
  true = 'да',
  false = 'нет',
}

export const SHAPE_FILTER = { property: Filters[0], value: Shapes };
export const COLOR_FILTER = { property: Filters[1], value: Colors };
export const SIZE_FILTER = { property: Filters[2], value: Sizes };
export const FAVORITE_FILTER = { property: Filters[3], value: Favorite };
