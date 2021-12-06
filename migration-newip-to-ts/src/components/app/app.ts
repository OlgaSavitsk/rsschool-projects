import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IResponseEverythingModel } from '../view/models/response-everything-model';
import { IResponseSourceModel } from '../view/models/response-sources-model';

class App {
  private controller: AppController;

  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  start(): void {
    document.querySelector('.sources')!
      .addEventListener('click', (e: Event) => this.controller.getNews(e, (data: IResponseEverythingModel) => this.view.drawNews(data)));
    this.controller.getSources((data: IResponseSourceModel) => this.view.drawSources(data));
  }
}

export default App;
