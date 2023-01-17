# Migration to 1.1

```bash
> npm install --save-dev zitjs@latest
```

## Changed

1. `isComponentFunc()`

`isComponentFunc()` has been renamed to `isComponent()`.

```diff
// is component?
- isComponentFunc(...);
+ isComponent(...);
```

2. `createElement()`

`options.tagName` has been renamed to `options.tag`.

> You can still use `options.tagName`. But this function may cease to work at any time.

```diff
- createElement({ tagName: "div" }, "Div Container!");
+ createElement({ tag: "div" }, "Div Container!");
```

## New Features

1. Component

This feature is very experimental.

It was made for [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)

```ts
class MyComponent extends zit.ZitComponent {
  constructor() {
    super();
    this.component.name = 'my-component';
  }

  render() {
    return '<p>Hello World!</p>';
  }
}
```

```ts
zit.defineComponent(MyComponent);
```

```html
<my-component></my-component>
<!--Hello World!-->
```

> [reference - component](./api-component)

## Fixed

- [fix: fixed prerendering bugs](https://github.com/do4ng/zit/commit/acf2fba59fd31b70c1bf0858c4761b762d28d62d)
