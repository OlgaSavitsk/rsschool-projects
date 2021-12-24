import Control from '../../common/control';

export default class Logo extends Control {
  public onToggleToHome!: () => void;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'logo', '');
    this.node.innerHTML = `
        <a href="#">
            <img src="./svg/tree.svg" alt="">
        </a>`;
    this.node.onclick = () => {
      this.onToggleToHome();
    };
  }
}
