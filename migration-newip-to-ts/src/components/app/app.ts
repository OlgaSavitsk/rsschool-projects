import AppController, { EventTargetEvent } from '@/controller/controller';
import AppView from '@/view/appView';
import { IResponseEverythingModel } from '@/view/models/response-everything-model';
import { IResponseSourceModel } from '@/view/models/response-sources-model';
import SearchForm from '@/view/search-form/search-form';

class App {
  private controller: AppController;

  private searchForm: SearchForm;

  constructor() {
    this.controller = new AppController();
    this.searchForm = new SearchForm();
  }

  public start(): void {
    const btnsSources = document.querySelector('.sources');
    if (btnsSources) {
      btnsSources.addEventListener('click', (e: Event) => this.controller.getNews(e as EventTargetEvent<HTMLElement>, (data: IResponseEverythingModel) => AppView.drawNews(data)));
      btnsSources.removeEventListener('click', (e: Event) => this.controller.getNews(e as EventTargetEvent<HTMLElement>, (data: IResponseEverythingModel) => AppView.drawNews(data)));
    }
    this.controller.getSources((data: IResponseSourceModel) => AppView.drawSources(data));
    this.searchForm.getSearch((data: IResponseEverythingModel) => {
      AppView.drawNews(data);
    });
  }
}

export default App;
