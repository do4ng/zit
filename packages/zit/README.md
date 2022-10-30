# zit.js

web framework working with vanilla javascript

[🦄 npm](https://www.npmjs.com/package/zit)
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

```ts
const foobar = zit.createElement('h1', 'foo bar');
const app = zit.html`${foobar}`;

console.log(app);
/*
<h1>foo bar</h1> 
*/
```

```ts
const greet = zit.createElement('h1', 'hello {{name}}', { name: 'default name' });
const app = zit.html`${greet({ name: 'world' })}`;

console.log(app);
/*
<h1>hello world</h1>
*/
```

## License

MIT
