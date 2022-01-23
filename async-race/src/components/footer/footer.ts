import Control from '@/common/components/control';

export default class Footer extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'footer', '');
    this.renderInnerHTML();
  }

  renderInnerHTML() {
    this.node.innerHTML = `<a class="github" href="https://github.com/OlgaSavitsk">OlgaSavitsk</a>
    <a class="school" href="https://rs.school/js/">
      <span class="school-year">'2022</span>
    </a>`;
  }
}
