interface IArticles {
  source: {
    id: string,
    name: string
  },
  author: string,
  title: string,
  description: string,
  url: string,
  urlToImage: string,
  publishedAt: string,
  content: string
}

export interface IResponseModel {
  status: string,
  totalResults: number,
  articles: IArticles[]
}
