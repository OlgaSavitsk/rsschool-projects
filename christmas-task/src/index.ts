import './index.scss';
import Application from './pages/aplication';
import ToysPage from './pages/toys';
import TreePage from './pages/tree';

const app = new Application(document.body);

let currentRouteId: number;

const getAllRouts = () => ({
  StartPage: {
    name: '',
    component: () => new Application(document.body),
  },
  ToysPage: {
    name: 'toys',
    component: () => new ToysPage(document.body),
  },
  TreePage: {
    name: 'tree',
    component: () => new TreePage(document.body),
  },
});

window.onpopstate = () => {
  currentRouteId = +window.location.hash.split('/')[1];
  const currentRoutName = window.location.hash.slice(1);
  const routes = getAllRouts();
  const currentRoute = Object.values(routes).find((value) => value.name === currentRoutName);
  if (!currentRoute) throw Error('CurrentRoute root element not found');

  while (document.body.firstElementChild) {
    document.body.removeChild(document.body.firstElementChild);
  }
  currentRoute.component();
};

console.log(`
score 185/200
Вёрстка страниц приложения и навигация между ними +30

Меню с настройками +50

Гирлянда +40

Игрушки в избранном +65/80
игрушка возвращается в слот за границами картинки с елкой +5/10
когда игрушку "вешают на ёлку" количество игрушек в слоте уменьшается, когда игрушку "снимают с 
ёлки", количество игрушек в слоте увеличивается, когда все экземпляры игрушки помещаются на ёлку,
отображается пустой слот -0;`);
