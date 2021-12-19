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
}

export const filterObject: IFilter = {
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
}

  export interface ISelectFilter {
    color: string[],
    shape: string
}