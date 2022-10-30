# zit.js

web framework working with vanilla javascript

[🦄 npm](https://www.npmjs.com/package/zitjs)
[📃 github](https://github.com/do4ng/zit)

## 📦 Install

```bash
npm install --save-dev zit
yarn add -D zit
```

```ts
// esm (browser)
import * as zit from 'zit';
// cjs (server)
const zit = require('zit');
```

## 🚀 Usage

### `createElement`

create javascript based component.

```ts
const like = createElement('h1', 'I love cat');
```

you can add props like:

```ts
// set default props
const like = createElement('h1', 'I love {{name}}', { name: 'cat' });

// edit props
like({ name: 'dog' });
```

you can also set attributes

```ts
createElement({ tagName: 'div', attributes: { class: 'container' } });
```

### `html`

```ts
const foobar = createElement('h1', 'foo bar');
const app = html`${foobar()}`;

console.log(app);
/*
<h1>foo bar</h1> 
*/
```

more simple

```ts
const app = html`${foobar}`;
// same: const app = html`${foobar()}`;
```

## 🎨 Example

[`./example/index.js`](../example/index.js)

```bash
npx vite
```
