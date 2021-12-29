import { IResponseEverythingModel } from "@/view/models/response-everything-model";
import { IResponseSourceModel } from "@/view/models/response-sources-model";
import AppLoader from "./appLoader";

export type KeyboardEvent =  {
  target: HTMLElement,
  currentTarget: HTMLElement,
};

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  currentTarget: T;
}

class AppController extends AppLoader {
  public getSources(callback: ((data: IResponseSourceModel) => void) | undefined): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  public getNews(e: HTMLElementEvent<HTMLElement>, callback: ((data: IResponseEverythingModel) => void) | undefined): void {
    let { target } = e;
    const newsContainer =  e.currentTarget;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
          (newsContainer.setAttribute('data-source', sourceId));
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
       target = target.parentElement!;
    }
  }
}

export default AppController;
