import Application from "./application/aplication";

const app = new Application(document.body);

export const getLocalStorageData = () => {
  const favoriteCount = JSON.parse(localStorage.getItem('favorite')!) || [];
  return favoriteCount
}

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

console.log(`
score 160/200
- Выполняются требования к вёрстке +10
- Карточка игрушки содержит её изображение, название, текстом или условным значком обозначено 
количество экземпляров, год покупки, форма, цвет, размер, является ли игрушка любимой +10

- кликая по карточке с игрушкой или по кнопке на ней игрушку можно добавлять в избранное или удалять 
из избранного. Карточки добавленных в избранное игрушек внешне отличаются от остальных +10
- на странице отображается количество добавленных в избранное игрушек. 
При попытке добавить в избранное больше 20 игрушек, выводится всплывающее уведомление 
с текстом "Извините, все слоты заполнены" +10

- сортировка игрушек по названию в возрастающем и спадающем порядке +10
- сортировка игрушек по году их приобретения в возрастающем и спадающем порядке +10

- фильтры по количеству экземпляров +10
- фильтры по году покупки +10
- для фильтрации в указанном диапазоне используется range slider с двумя ползунками.
При перемещении ползунков отображается их текущее значение, разный цвет слайдера до 
и после ползунка +10

- фильтры по форме +5
- фильтры по цвету +5
- фильтры по размеру +5
-? можно отобразить только любимые игрушки +5
- можно отфильтровать игрушки по нескольким фильтрам одного типа +10

Можно отфильтровать игрушки по нескольким фильтрам разного типа
(работают совместно все фильтры по значению, фильтры по значению и сортировка) +15

- при открытии приложения курсор находится в поле поиска +2
- автозаполнение поля поиска отключено (нет выпадающего списка с предыдущими запросами) +2
- есть placeholder +2
- в поле поиска есть крестик, позволяющий очистить поле поиска +2
- если нет совпадения последовательности букв в поисковом запросе с названием игрушки, 
выводится уведомление в человекочитаемом формате, например "Извините, совпадений не обнаружено" +2
- при вводе поискового запроса на странице остаются только те игрушки, в которых есть указанные в поиске буквы в 
указанном порядке. При этом не обязательно, чтобы буквы были в начале слова. Регистр символов при поиске не учитывается +10
Поиск ведётся только среди игрушек, которые в данный момент отображаются на странице.
если очистить поле поиска, на странице отображаются игрушки, соответствующие всем выбранным фильтрам и настройкам сортировки +5.`)