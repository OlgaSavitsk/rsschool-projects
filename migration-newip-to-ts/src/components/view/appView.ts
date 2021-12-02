import { IResponseEverythingModel } from './models/response-everything-model';
import { IResponseSourceModel } from './models/response-sources-model';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
  private news: News;

  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: IResponseEverythingModel): void {
    console.log('data', data)
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: IResponseSourceModel): void {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
