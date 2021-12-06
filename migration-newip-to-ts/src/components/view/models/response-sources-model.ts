export interface ISource {
  id: string,
  name: string,
  description: string,
  url: string,
  category: string,
  language: string,
  country: string
}

export interface IResponseSourceModel {
  status: string,
  sources: ISource[]
}
