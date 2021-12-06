import { IResponseEverythingModel } from './components/view/models/response-everything-model';
import { IResponseSourceModel } from './components/view/models/response-sources-model';

enum Links {
  baseUrl = 'https://newsapi.org/v2/',
  apiKey = '0ab8f7227c764b13ad6041ea602eb3ab',
}

export type responseType = {
  type?: IResponseSourceModel | IResponseEverythingModel
};

export default Links;
