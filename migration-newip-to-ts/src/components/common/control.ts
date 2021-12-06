export class Control<NodeType extends HTMLElement = HTMLElement> {
  public node: NodeType;

  constructor(tagName = 'div', className = '', content = '') {
    const el = document.createElement(tagName);
    el.className = className;
    el.textContent = content;
    this.node = el as NodeType;
  }

  destroy(): void {
    this.node.remove();
  }
}

export default Control;
