import Footer from './components/footer/footer';
import './index.scss';
import GaragePage from './pages/garage';
import WinnerPage from './pages/winner';

const app = new GaragePage(document.body);
const footer = new Footer(document.body);

let currentRouteId: number;

const getAllRouts = () => ({
  GaragePage: {
    name: 'garage',
    component: () => new GaragePage(document.body),
  },
  WinnerPage: {
    name: 'winner',
    component: () => new WinnerPage(document.body),
  },
});

window.onpopstate = () => {
  currentRouteId = Number(window.location.hash.split('/')[1]);
  const currentRoutName = window.location.hash.slice(1);
  const routes = getAllRouts();
  const currentRoute = Object.values(routes).find((value: { name: string; }) => value.name === currentRoutName);
  if (!currentRoute) throw Error('CurrentRoute root element not found');
  while (document.body.firstElementChild) {
    document.body.removeChild(document.body.firstElementChild);
  }
  currentRoute.component();
  const footer = new Footer(document.body);
};
