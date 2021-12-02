export interface ISourceEverything {
  id: string,
  name: string
}

export interface IArticles {
  source: ISourceEverything,
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string,
  content: string
}

export interface IResponseEverythingModel {
  status: string,
  totalResults: number,
  articles: IArticles[]
}
