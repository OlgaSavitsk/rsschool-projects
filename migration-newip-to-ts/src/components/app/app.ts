import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IResponseEverythingModel } from '../view/models/response-everything-model';
import { IResponseSourceModel } from '../view/models/response-sources-model';
import SearchForm from '../view/search-form/search-form';

class App {
  private controller: AppController;

  public view: AppView;

  searchForm: SearchForm;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
    this.searchForm = new SearchForm();
  }

  start(): void {
    document.querySelector('.sources')!
      .addEventListener('click', (e: Event) => this.controller.getNews(e, (data: IResponseEverythingModel) => AppView.drawNews(data)));
    this.controller.getSources((data: IResponseSourceModel) => AppView.drawSources(data));
    this.searchForm.getSearch((data: IResponseEverythingModel) => AppView.drawNews(data));
  }
}

export default App;
