import { IResponseEverythingModel } from "./models/response-everything-model";
import { IResponseSourceModel } from "./models/response-sources-model";
import News from "./news/news";
import SortService from "./sort-by-date/sort-service";
import Sources from "./sources/sources";

export default class AppView {
  private news: News;

  private sources: Sources;

  static isDesk: boolean;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
    AppView.isDesk = false;
  }

  static drawNews(data: IResponseEverythingModel): void {
    const values = data?.articles ? data?.articles : [];
    News.draw(values);
    document.querySelector('.sort')?.addEventListener('click', () => {
      this.isDesk = !this.isDesk;
      console.log(this.isDesk);
      SortService.transform(values, this.isDesk);
    });
  }

  static drawSources(data: IResponseSourceModel): void {
    const values = data?.sources ? data?.sources : [];
    Sources.draw(values);
  }
}
