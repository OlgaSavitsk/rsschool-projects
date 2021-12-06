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

  static drawNews(data: IResponseEverythingModel): void {
    const values = data?.articles ? data?.articles : [];
    News.draw(values);
  }

  static drawSources(data: IResponseSourceModel): void {
    const values = data?.sources ? data?.sources : [];
    Sources.draw(values);
  }
}

export default AppView;
