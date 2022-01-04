export class Control<NodeType extends HTMLElement> {
  public node: NodeType;

  constructor(tagName = 'div', className = '', content = '') {
    const el = document.createElement(tagName);
    el.className = className;
    el.textContent = content;
    this.node = el as NodeType;
  }

  public destroy(): void {
    this.node.remove();
  }
}

export default Control;
