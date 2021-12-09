import Toys from "./pages/toys";

const app = new Toys(document.body);
//let currentRouteId: number;

/* const routes = [
  {
    name: '',
    component: () => {
      app = new Application(document.body);
      return app;
    },
  },
  {
    name: 'categories',
    component: () => {
      const categoriesPage = new CategoriesPage(document.body);
      return categoriesPage;
    },
  },
  {
    name: 'categories/:id',
    component: () => {
      const questionsArtistPage = new QuestionsArtistPage(document.body, currentRouteId);
      return questionsArtistPage;
    },
  },
  {
    name: 'pictures',
    component: () => {
      const categoriesPicturesPage = new CategoriesPicturesPage(document.body);
      return categoriesPicturesPage;
    },
  },
  {
    name: 'pictures/:id',
    component: () => {
      const questionsPicturesPage = new QuestionsPicturesPage(document.body, currentRouteId);
      return questionsPicturesPage;
    },
  },
  {
    name: 'score/:id',
    component: () => {
      const scorePage = new ScorePage(document.body, currentRouteId);
      return scorePage;
    },
  },
  {
    name: 'score-picture/:id',
    component: () => {
      const scorePicturePage = new ScorePicturePage(document.body, currentRouteId);
      return scorePicturePage;
    },
  },
  {
    name: 'setting',
    component: () => {
      const settingPage = new SettingPage(document.body);
      return settingPage;
    },
  },
];
const setRoutId = (id) => {
  routes[2].name = `categories/${id}`;
  routes[2].component = () => {
    const questionsArtistPage = new QuestionsArtistPage(document.body, id - 1);
    return questionsArtistPage;
  };
  routes[4].name = `picture/${id}`;
  routes[4].component = () => {
    const questionsPicturesPage = new QuestionsPicturesPage(document.body, id - 1);
    return questionsPicturesPage;
  };
  routes[5].name = `score/${id}`;
  routes[5].component = () => {
    const scorePage = new ScorePage(document.body, id - 1);
    return scorePage;
  };
  routes[6].name = `score-picture/${id}`;
  routes[6].component = () => {
    const scorePicturePage = new ScorePicturePage(document.body, id - 1);
    return scorePicturePage;
  };
};

window.onpopstate = () => {
  currentRouteId = +window.location.hash.split('/')[1];
  const currentRoutName = window.location.hash.slice(1);
  setRoutId(currentRouteId);
  const currentRoute = routes.find((p) => p.name === currentRoutName);
  if (!currentRoute) throw Error('CurrentRoute root element not found');

  while (document.body.firstElementChild) {
    document.body.removeChild(document.body.firstElementChild);
  }
  currentRoute.component();
};

selfCheck.selfCheck(); */
