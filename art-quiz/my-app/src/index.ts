import { Footer } from "./components/footer/footer";
import { Application } from "./pages/application";
import { CategoriesPage } from "./pages/categories-page";
import { CategoriesPicturesPage } from "./pages/categories-picture-page";
import { QuestionsArtistPage } from "./pages/question-artist-page";
import { QuestionsPicturesPage } from "./pages/question-pictures-page";
import { ScorePage } from "./pages/score-page";
import { ScorePicturePage } from "./pages/score-picture-page";
import { SettingPage } from "./pages/settings-page";

const app = new Application(document.body)
//new QuestionsPicturesPage(app.node, 0, '')
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
    "name": 'pictures',
    "component": () => {
      new CategoriesPicturesPage(document.body)
     }
  },
  {
    "name": `pictures/:id`,
    "component": () => {
      new QuestionsPicturesPage(document.body, currentRouteId)
     }
  },
  {
    "name": `score/:id`,
    "component": () => {
      new ScorePage(document.body, currentRouteId)
     }
  },
  {
    "name": `score-picture/:id`,
    "component": () => {
      new ScorePicturePage(document.body, currentRouteId)
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
    routes[4]['name'] = `picture/${id}`
    routes[4]['component'] = () => {
      new QuestionsPicturesPage(document.body, id - 1)
    }
    routes[5]['name'] = `score/${id}`
    routes[5]['component'] = () => {
      new ScorePage(document.body, id - 1)
    }
    routes[6]['name'] = `score-picture/${id}`
    routes[6]['component'] = () => {
      new ScorePicturePage(document.body, id - 1)
    }
}
