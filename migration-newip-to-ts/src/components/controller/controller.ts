import { IResponseEverythingModel } from '@/view/models/response-everything-model';
import { IResponseSourceModel } from '@/view/models/response-sources-model';
import baseLink from '@/common/constants/constants';
import Loader, { OptionsType } from './loader';

const optionsProps = <OptionsType> {
  apiKey: process.env.API_KEY,
};

export type EventTargetEvent<T extends HTMLElement> = Event & {
  target: T;
  currentTarget: T;
};

export default class AppController extends Loader {
  constructor() {
    super({ baseLink, optionsProps });
  }
  public getSources(callback: ((data: IResponseSourceModel) => void) | undefined): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  public getNews(
    e: EventTargetEvent<HTMLElement>,
    callback: ((data: IResponseEverythingModel) => void) | undefined,
  ): void {
    let { target } = e;
    const newsContainer = e.currentTarget;

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId && sourceId) {
          (newsContainer.setAttribute('data-source', sourceId));
          super.getRespSearch(
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
