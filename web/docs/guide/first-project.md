# first project

## Before start

You have to install yarn

## Init project

First, create new project.

```bash
$ mkdir my-blog
$ cd my-blog
$ npm init
```

Install [vite](https://www.vitejs.dev) and zitjs.

```bash
$ yarn add -D vite zitjs
```

## Create Files

Make `vite.config.js` and set entry.

```js
// vite.config.js
import vite from 'vite';

export default vite.defineConfig({
  server: {
    port: 8080,
  },
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
});
```

Create `index.html` and `src/index.ts`

```html
<!--...-->
<body>
  <div id="app"></div>
  <script src="/src/index.ts" type="module"></script>
</body>
```

```ts
// src/index.ts
import { useRouter } from 'zitjs';
/**
 * You can set route using with path (like express)
 */
useRouter({
  '/': { template: 'Hello World!' },
});
```

and serve your project.

```bash
$ npx vite
```

and open [localhost:8080](http://localhost:8080)!

## Next

In next page, we'll basic of blog.
