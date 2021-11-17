import { Footer } from "./components/footer/footer";
import { ModalCongratulation } from "./components/modal-congratulation/modal-congratulation";
import { ModalImageInformation } from "./components/modal-image-information/modal-image-information";
import { Application } from "./pages/application";
import { CategoriesPage } from "./pages/categories-page";
import { QuestionsArtistPage } from "./pages/question-artist-page";
import { SettingPage } from "./pages/settings-page";

const app = new Application(document.body)
//new ModalCongratulation(app.node)
//new QuestionsArtistPage(app.node)
//new CategoriesPage(app.node)
//new SettingPage(document.body)
new Footer(app.node)
let currentRouteId: number

window.onpopstate = () => {
  let currentRouteId = +window.location.hash.split('/')[1];
  const currentRoutName = window.location.hash.slice(1);
  
  console.log('currentRouteId', currentRouteId)
  console.log('currentRoutName', currentRoutName)

    routes[2]['name'] = `categories/${currentRouteId}`
    routes[2]['component'] = () => {
      new QuestionsArtistPage(document.body, currentRouteId - 1)
    }
  console.log('p', routes[2].name)

  const currentRoute = routes.find(p => p.name === currentRoutName);
  console.log('currentRoute', currentRoute)
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
    "name": 'setting',
    "component": () => {
      new SettingPage(document.body)
     }
  },
  /* {
    "name": 'questions',
    "component": () => {
      new QuestionsArtistPage(document.body)
     }
  }, */
];
