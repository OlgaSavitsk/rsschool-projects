import Control from '@/common/components/control';

export default class Snowflake extends Control {
  private snowflake!: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'snowflakes', '');
  }

  public renderSnowflake(): void {
    setInterval(() => {
      this.snowflake = new Control(this.node, 'i', 'fas fa-snowflake', '');
      this.snowflake.node.style.left = `${Math.random() * 800}px`;
      this.snowflake.node.style.animationDuration = `${Math.random() * 5 + 5}s`;
    }, 100);
    setTimeout(() => {
      this.snowflake.destroy();
    }, 5000);
  }
}
