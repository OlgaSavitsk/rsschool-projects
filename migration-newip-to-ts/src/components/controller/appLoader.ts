import Links from '../../constants';
import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super(Links.baseUrl, {
      apiKey: Links.apiKey,
    });
  }
}

export default AppLoader;
