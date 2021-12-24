export interface IDefaultFilters {
  shape: string[],
  color: string[],
  size: string[]
  count: string[],
  year: string[],
  favorite: string
}

export const defaultFilters = {
  shape: ([] as string[]),
  color: ([] as string[]),
  size: ([] as string[]),
  count: ['1', '12'],
  year: ['1940', '2020'],
  favorite: 'нет',
};
