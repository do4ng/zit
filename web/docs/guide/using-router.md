# Using Router

Now, make some pages showing our posts.

## Create Component

Before create blog, you have to know about `createElement`.

If you use `createElement`, you can make component easily.

See example.

```js
import { createElement } from 'zitjs';

const component = createElement('div', 'Hello World!');

component(); // => <div>Hello World!</div>
```

Also you can add params.

```js
const greeting = createElement('div', 'Hello, {{name}}', { name: 'world' });

greeting(); // => <div>Hello, world</div>
greeting({ name: 'sun' }); // => <div>Hello, sun</div>
```

```js
const container = createElement('div', 'hello {{slug}}'); // slug is special param
container('world'); // => <div>hello world</div>
const empty = createElement(null, 'ping pong')(); // => ping pong
const attr = createElement({ tagName: 'a', attributes: { href: '#' } }, 'Go');
// => <a href="#">Go</a>
```

[Documentation](/guide/api-createElement)

## Edit Router

```ts
// src/index.ts

import { useRouter, createElement } from 'zitjs';

// posts
const posts = {
  1: 'Hello World!',
  2: 'Ping Pong!',
};

/**
 * create component
 *
 * blogPage("hello world"); => <div>hello world</div>
 */
const blogPage = createElement('div', 'post {{posts[id]}}', { posts });

useRouter({
  '/': { template: '<a href="/post/1">post 1</a> <a href="/post/2">post 2</a>' },
  '/post/:id': { template: blogPage },
});
```

and.. visit [/post/1](http://localhost:8080/post/1).

You might see **"Hello World!"**. You do well👏.
