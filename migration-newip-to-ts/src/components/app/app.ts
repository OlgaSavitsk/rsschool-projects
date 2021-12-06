import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IResponseEverythingModel } from '../view/models/response-everything-model';
import { IResponseSourceModel } from '../view/models/response-sources-model';

class App {
  private controller: AppController;

  public view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    document.querySelector('.sources')!
      .addEventListener('click', (e: Event) => this.controller.getNews(e, (data: IResponseEverythingModel) => AppView.drawNews(data)));
    this.controller.getSources((data: IResponseSourceModel) => AppView.drawSources(data));
  }
}

export default App;
