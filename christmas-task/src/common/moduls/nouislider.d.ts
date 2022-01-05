declare module noUiSlider {

  const enum PipFilterResult {
    NoValue,
    LargeValue,
    SmallValue,
  }

  interface PipsOptions {
    mode: string; // "range" | "steps" | "positions" | "count" | "values"
    density?: number;
    filter?: (...args: any[]) => PipFilterResult;
    format?: Object;
    values?: number | number[];
    stepped?: boolean;
  }

  interface Options {
    start: number | number[] | number[][];
    range: Object;
    connect?: string | boolean;
    margin?: number;
    limit?: number;
    step?: number;
    orientation?: string;
    direction?: string;
    animate?: boolean;
    behaviour?: string;
    format?: Object | ((...args:any[]) => any);
    pips?: PipsOptions;
  }

  function create(target: HTMLElement, options: Options): void;

  interface Callback {
    (values: any[], handle: number, unencoded: number): void
  }

  interface NoUiSlider {
    on(eventName: string, callback: Callback): void;
    off(eventName: string): void;
    destroy(): void;
    get(): number | number[];
    set(value: number | number[]): void;
  }

  interface Instance extends HTMLElement {
    noUiSlider: NoUiSlider
  }
}

declare module 'nouislider' {
  export = noUiSlider;
}
