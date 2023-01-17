# Components

```ts
class MyComponent extends zit.ZitComponent {
  constructor() {
    super();
    // component name
    this.component.name = 'my-component';
  }

  render() {
    // inner html
    return '<p>Hello World!</p>';
  }
}

zit.defineComponent(MyComponent);
```

- `ZitComponent`

```ts
export interface ComponentOptions {
  name: string;
}

export class ZitComponent extends HTMLElement {
  public component: ComponentOptions;
  constructor();
  render(): string;
}
```

- `defineComponent`

```ts
export function defineComponent(component: typeof ZitComponent): void;
```
