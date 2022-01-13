import Control from '@/common/components/control';
import { DELAY, SNOWFLAKE_INNER_WIDTH, SNOWFLAKE_TIME_INTERVAL } from '@/common/constants/constants';

export default class Snowflake extends Control {
  private snowflake!: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'snowflakes', '');
  }

  public renderSnowflake(): void {
    setInterval(() => {
      this.snowflake = new Control(this.node, 'i', 'fas fa-snowflake', '');
      this.snowflake.node.style.left = `${Math.random() * SNOWFLAKE_INNER_WIDTH}px`;
      this.snowflake.node.style.animationDuration = `${Math.random() * SNOWFLAKE_TIME_INTERVAL + DELAY}s`;
    }, 100);
    setTimeout(() => {
      this.snowflake.destroy();
    }, 5000);
  }
}
