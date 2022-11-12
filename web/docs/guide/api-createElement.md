# Create Element

`createElement()` is very important function in zitjs

## Usage

```ts
import { createElement } from 'zitjs';

const TagData = {
  tagName: 'div',
  attributes: {
    /* attributes */
  },
};
const Inner = 'Hello {{name}}';
const Data = { name: 'world' };

const result = createElement(TagData, Inner, Data); // => Function

result(); // => <div>Hello world</div>
result({ name: 'zit' }); // => <div>Hello zit</div>

createElement(null, 'Hello'); // Hello
```

## Is Element

Use `isComponentFunc` to know if it is element.

```ts
import { isComponentFunc, createElement } from 'zitjs';

isComponentFunc(createElement('div', 'Hello World')); // true
isComponentFunc('Hello World'); // false
isComponentFunc(() => 'Hello World'); // false
```

To create a custom element, set `component.__COMPONENT` to `true`.

```ts
const customElement = (data: object) => {
  return JSON.stringify(data);
};
customElement.__COMPONENT = true;

isComponentFunc(customElement); // true
```

## Interface

```ts
export type ComponentData = string | object | null | Function | HTML; // any
export type ElementOutput = (newData?: ComponentData) => string;

export function createElement(
  tag: string | Tag | undefined | null,
  template: string | HTML,
  data?: object
): ElementOutput;
```
