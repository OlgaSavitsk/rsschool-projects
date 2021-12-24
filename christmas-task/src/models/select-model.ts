export interface IDesk {
  isDeskName: boolean | undefined,
  isDeskCount: boolean | undefined
  select: string
}

export const desk: IDesk = {
  isDeskName: false,
  isDeskCount: false,
  select: 'сортировать',
};
