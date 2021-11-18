import { Footer } from "./components/footer/footer";
import { Application } from "./pages/application";
import { CategoriesPage } from "./pages/categories-page";
import { QuestionsArtistPage } from "./pages/question-artist-page";
import { ScorePage } from "./pages/score-page";
import { SettingPage } from "./pages/settings-page";

const app = new Application(document.body)
new Footer(app.node)
let currentRouteId: number

window.onpopstate = () => {
  let currentRouteId = +window.location.hash.split('/')[1];
  const currentRoutName = window.location.hash.slice(1);
  setRoutId(currentRouteId)
  const currentRoute = routes.find(p => p.name === currentRoutName);
  if (!currentRoute) throw Error('CurrentRoute root element not found');

  while (document.body.firstElementChild) {
    document.body.removeChild(document.body.firstElementChild);
  } 
  currentRoute.component()
};

const routes = [
  {
    "name": '',
    "component": () => {
      new Application(document.body)   
    }
  },
  {
    "name": 'categories',
    "component": () => {
      new CategoriesPage(document.body)
     }
  },
  {
    "name": `categories/:id`,
    "component": () => {
      new QuestionsArtistPage(document.body, currentRouteId)
     }
  },
  {
    "name": `score/:id`,
    "component": () => {
      new ScorePage(document.body, currentRouteId)
     }
  },
  {
    "name": 'setting',
    "component": () => {
      new SettingPage(document.body)
     }
  }
];

const setRoutId = (id) => {
    routes[2]['name'] = `categories/${id}`
    routes[2]['component'] = () => {
      new QuestionsArtistPage(document.body, id - 1)
    }
    routes[3]['name'] = `score/${id}`
    routes[3]['component'] = () => {
      new ScorePage(document.body, id - 1)
    }
}
