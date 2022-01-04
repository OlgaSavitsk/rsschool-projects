import { IResponseEverythingModel } from '@/view/models/response-everything-model';
import { IResponseSourceModel } from '@/view/models/response-sources-model';

export type OptionsType = {
  [apiKey: string]: string
};

class Loader {
  public baseLink: string;

  public options: { optionsProps: OptionsType; };

  constructor({ baseLink, ...optionsProps }: { baseLink: string, optionsProps: OptionsType }) {
    this.baseLink = baseLink;
    this.options = optionsProps;
  }

  public async getResp<T extends IResponseSourceModel | IResponseEverythingModel>(
    { endpoint = '', options = {} },
    callback = (data: T) => {
      if (!data) {
        console.error('No callback for GET response');
      }
    },
  ): Promise<void> {
    await this.load('GET', endpoint, callback, options);
  }

  static errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404) {
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      }
      throw Error(res.statusText);
    }
    return res;
  }

  public makeUrl(options: {}, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.values(urlOptions).forEach((key) => {
      url += `apiKey=${key.apiKey}&`;
    });
    return url.slice(0, -1);
  }

  public async load<T extends IResponseSourceModel | IResponseEverythingModel>(
    method: string,
    endpoint: string,
    callback: { (data: T): void },
    options = {},
  ): Promise<void> {
    try {
      const response: Response = await fetch(this.makeUrl(options, endpoint), { method });
      Loader.errorHandler(response);
      const sources = await response.json();
      callback(sources);
    } catch (err: unknown) {
      console.error(err);
    }
  }

  public getRespSearch(
    { endpoint = '', options = {} },
    callback = (data: IResponseEverythingModel) => {
      if (!data) {
        console.error('No callback for GET response');
      }
    },
  ): void {
    this.loadSearch('GET', endpoint, callback, options);
  }

  public makeUrlSearch(options: {}, endpoint: string): string {
    const urlOptions = { ...this.options, ...options };
    const url = `${this.baseLink}${endpoint}?q=${Object.values(options)}&apiKey=${urlOptions.optionsProps.apiKey}`;
    return url;
  }

  public async loadSearch<T extends IResponseSourceModel | IResponseEverythingModel>(
    method: string,
    endpoint: string,
    callback: { (data: T): void },
    options = {},
  ): Promise<void> {
    try {
      const response: Response = await fetch(this.makeUrlSearch(options, endpoint), { method });
      Loader.errorHandler(response);
      const sources = await response.json();
      callback(sources);
    } catch (err: unknown) {
      console.error(err);
    }
  }
}

export default Loader;
