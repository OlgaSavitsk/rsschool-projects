import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '0ab8f7227c764b13ad6041ea602eb3ab',
    });
  }
}

export default AppLoader;
