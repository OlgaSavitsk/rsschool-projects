export enum Filters {
    shape,
    color,
    size,
    favorite
}

enum Shapes {
    ball = 'шар',
    bell = 'колокольчик',
    cone = 'шишка',
    snowflake = 'снежинка',
    toy = 'фигурка'
}

enum Colors {
    white = 'белый',
    yellow = 'желтый',
    red = 'красный',
    blue = 'синий',
    green = 'зелёный'
}

enum Sizes {
    big = 'большой',
    medium = 'средний',
    small = 'малый'
}

enum Favorite {
    true = 'да',
    false = 'нет'
}

export const SHAPE_FILTER = {property: Filters[0], value: Shapes}
export const COLOR_FILTER = {property: Filters[1], value: Colors}
export const SIZE_FILTER = {property: Filters[2], value: Sizes}
export const FAVORITE_FILTER = {property: Filters[3], value: Favorite}

enum ConstantsFilter {
    SHAPE_FILTER,
    COLOR_FILTER,
    SIZE_FILTER
  };

export interface IFilter {
    ball: boolean,
    bell:boolean,
    cone: boolean,
    snowflake: boolean,
    toy: boolean,
    white: boolean,
    yellow: boolean,
    red: boolean,
    blue: boolean,
    green: boolean,
    big: boolean,
    medium: boolean,
    small: boolean,
    favorite: boolean
    count: number,
    year: number,
    select: string
    isDeskName: boolean,
    isDeskCount: boolean
}

export const defaultFilterObject: IFilter = {
    ball: false,
    bell: false,
    cone: false,
    snowflake: false,
    toy: false,
    white: false,
    yellow: false,
    red: false,
    blue: false,
    green: false,
    big: false,
    medium: false,
    small: false,
    favorite: false,
    count: 0,
    year: 0,
    select: "",
    isDeskName: false,
    isDeskCount: false
}
  
export default ConstantsFilter;
