
import Links from '@/common/constants';
import Loader from './loader';
require("dotenv").config();

const API_KEY = process.env.API_KEY;

class AppLoader extends Loader {
  constructor() {
    super(Links.baseUrl, {
      apiKey: API_KEY!,
    });
  }
}

export default AppLoader;
