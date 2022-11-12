# Use Router

## Usage

```ts
import * as zit from 'zitjs';

const mainPage = zit.createElement(null, '<a href="/page/1">Page 1</a> <a href="/page/2">Page 2</a>');
const page = zit.createElement(null, '{{data}}, page {{slug}}');

zit.useRouter({
  '/': { template: mainPage },
  '/page/:slug': {
    template: page,
    js: () => {
      // after load
    },
    beforeLoad: ({ params }) => {
      // before load

      console.log(params.slug); // slug

      return {
        data: 'Hello World',
      };
    },
  },
});
```

## Interface

```ts
interface Routing {
  [key: string]: { template: any; js?: (params: object) => void; beforeLoad?: (data: any) => Promise<object> | object };
}
export function useRouter(routing: Routing, target: HTMLElement): void;
```
