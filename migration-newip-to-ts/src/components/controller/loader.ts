import { IOptions } from '../view/models/options-model';
import { IResponseEverythingModel } from '../view/models/response-everything-model';
import { IResponseSourceModel } from '../view/models/response-sources-model';

class Loader {
  public baseLink: string;

  public options: IOptions;

  constructor(baseLink: string, options: IOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp<T extends IResponseSourceModel | IResponseEverythingModel>(
    { endpoint, options = {} },
    callback = (data: T) => {
      if (!data) {
        console.error('No callback for GET response');
      }
    },
  ): void {
    this.load('GET', endpoint, callback, options);
  }

  static errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) { console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`); }

      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: {}, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };

    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load(method: string, endpoint: string, callback: { (data: any): void }, options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })

      .then(Loader.errorHandler)

      .then((res: Response) => res.json())

      .then((data) => callback(data))

      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
