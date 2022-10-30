import { ComponentData, HTML, Tag } from '../html';

export interface Store<T> {
  value: T;
  __STORE: boolean;
  onChange: (fn: any) => void;
}

export type ElementOutput = (newData?: ComponentData) => string;

/**
 * ```js
 * createElement("div", "Hello, {{name}}", {name: "world"});
 *
 * createElement({tagName: "div", attributes: {id: "name"}}, "Hello, {{name}}", {name: "world"});
 * ```
 * @param tag tag data
 * @param template html template
 * @param data data
 */
export function createElement(
  tag: string | Tag | undefined | null,
  template: string | HTML,
  data?: object
  // eslint-disable-next-line no-unused-vars
): ElementOutput;

export function isComponent(c: any): boolean;
export function isComponentFunc(c: any): boolean;

/**
 * ```js
 * const container = createElement("div", "{{slug}}");
 * const greet = createElement("h1", "Hello, World");
 * const app = document.getElementById("app");
 *
 * app.innerHTML = html`
 * ${container(greet)}
 * `;
 * ```
 */
export function html(...data: any[]): string;
export type StoreOutput<T> = [Store<T>, (setter: (prevalue: T) => T) => void];
export function useStore<T>(init: T): StoreOutput<T>;

export * from '../html';
