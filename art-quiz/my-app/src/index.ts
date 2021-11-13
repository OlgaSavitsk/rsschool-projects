import { Footer } from "./components/footer/footer";
import { Application } from "./pages/application";
import { CategoriesPage } from "./pages/categories-page";
import { QuestionsArtistPage } from "./pages/question-artist-page";
import { SettingPage } from "./pages/settings-page";

const app = new Application(document.body)
//new QuestionsArtistPage(app.node)
//new CategoriesPage(app.node)
//new SettingPage(document.body)
new Footer(app.node)

window.onpopstate = () => {
 
  const currentRoutName = window.location.hash.slice(1);
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
    "name": 'categories/:id',
    "component": () => {
      new QuestionsArtistPage(document.body)
     }
  },
  {
    "name": 'setting',
    "component": () => {
      new SettingPage(document.body)
     }
  },
  {
    "name": 'questions',
    "component": () => {
      new QuestionsArtistPage(document.body)
     }
  },
];
