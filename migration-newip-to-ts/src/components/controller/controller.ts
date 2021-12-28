import { IResponseEverythingModel } from "@/view/models/response-everything-model";
import { IResponseSourceModel } from "@/view/models/response-sources-model";
import AppLoader from "./appLoader";

class AppController extends AppLoader {
  getSources(callback: ((data: IResponseSourceModel) => void) | undefined): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  getNews(e: Event, callback: ((data: IResponseEverythingModel) => void) | undefined): void {
    let target = <HTMLElement>e.target;

    const newsContainer = <HTMLElement>e.currentTarget;

    while (target !== newsContainer) {
      if (target!.classList.contains('source__item')) {
        const sourceId = target!.getAttribute('data-source-id');
        if (newsContainer!.getAttribute('data-source') !== sourceId) {
          newsContainer!.setAttribute('data-source', sourceId!);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;
