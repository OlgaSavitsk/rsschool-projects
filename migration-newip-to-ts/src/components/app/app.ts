import AppController from "@/controller/controller";
import AppView from "@/view/appView";
import { IResponseEverythingModel } from "@/view/models/response-everything-model";
import { IResponseSourceModel } from "@/view/models/response-sources-model";
import SearchForm from "@/view/search-form/search-form";

class App {
  private controller: AppController;

  public searchForm: SearchForm;

  constructor() {
    this.controller = new AppController();
    this.searchForm = new SearchForm();
  }

  start() {
    let btnsSources = document.querySelector<HTMLButtonElement>('.sources')
    if(btnsSources) {
      btnsSources.addEventListener('click', (e) => this.controller.getNews(e, (data: IResponseEverythingModel) => AppView.drawNews(data)));
      this.controller.getSources((data: IResponseSourceModel) => AppView.drawSources(data));
      this.searchForm.getSearch((data: IResponseEverythingModel) => {
        AppView.drawNews(data);
      });
    }
     
  }
}

export default App;
