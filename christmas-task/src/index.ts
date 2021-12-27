import './index.scss';
import Application from './pages/aplication';
import ToysPage from './pages/toys';
import TreePage from './pages/tree';

const app = new TreePage(document.body);


let currentRouteId: number;

const getAllRouts = () => {
return {
    StartPage: {
        name: '',
        component: () => new Application(document.body)
    },
    ToysPage: {
        name: 'toys',
        component: () => new ToysPage(document.body)
      },
      TreePage: {
        name: 'tree',
        component: () => new TreePage(document.body)
      },
    }
}

window.onpopstate = () => {
    currentRouteId = +window.location.hash.split('/')[1];
    const currentRoutName = window.location.hash.slice(1);
    const routes = getAllRouts()
    const currentRoute = Object.values(routes).find((value) => value.name === currentRoutName);
    if (!currentRoute) throw Error('CurrentRoute root element not found');
  
    while (document.body.firstElementChild) {
      document.body.removeChild(document.body.firstElementChild);
    } 
    currentRoute.component();
    
  };


console.log(`
score 190/200
Вёрстка страниц приложения и навигация между ними +30

Меню с настройками +50
--выбранные настройки сохраняются в local storage и отображаются при перезагрузке страницы. 
Если музыка сохранилась включённой, она начинает играть при первом клике. 
Есть кнопка сброса настроек, которая очищает local storage +10

Гирлянда +40

Игрушки в избранном +80
--возле слота с каждой игрушкой указывается количество игрушек в слоте равное количеству экземпляров игрушки в массиве с исходными данными +10
когда игрушку "вешают на ёлку" количество игрушек в слоте уменьшается, когда игрушку "снимают с 
ёлки", количество игрушек в слоте увеличивается, когда все экземпляры игрушки помещаются на ёлку,
 отображается пустой слот +10;`)
