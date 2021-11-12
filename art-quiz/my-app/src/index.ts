import { Footer } from "./components/footer/footer";
import { Application } from "./pages/application";
import { CategoriesPage } from "./pages/categories-page";
import { SettingPage } from "./pages/settings-page";

const app = new Application(document.body)
new CategoriesPage(app.node)
//new SettingPage(document.body)
//new Footer(app.node)
//(window as any).app = app





/* import image from './assets/favicon.png';

const createImage = (src: string) => new Promise<HTMLImageElement>((res, rej) => {
  const img = new Image();
  img.onload = () => res(img);
  img.onerror = rej;
  img.src = src;
});

async function render() {
  const subHeader = document.createElement('h2');
  subHeader.innerHTML = 'This elements was created by js';
  const myImage = await createImage(image);
  document.body.appendChild(subHeader);
  document.body.appendChild(myImage);
}

render(); */
