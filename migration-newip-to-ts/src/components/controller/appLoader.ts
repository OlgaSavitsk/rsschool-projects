
import baseLink from '@/common/constants';
import Loader, { OptionsType }  from './loader';

const API_KEY = process.env.API_KEY;
const optionsProps = <OptionsType> {
  apiKey: API_KEY
}

class AppLoader extends Loader {
  constructor() {
    super({baseLink, optionsProps});
  }
}

export default AppLoader;
