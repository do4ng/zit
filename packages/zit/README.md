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
import * as zit from 'zitjs';
// cjs (server)
const zit = require('zitjs');
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

## 🛠️ Router

```ts
const userPage = zit.createElement("div", "{{user}}'s page")

zit.useRouter({
  {
    '/': { template: "<div>Main Page</div>" },
    "/users/:user": { template: userPage } // use params
  }
}, document.getElementById('app'));
```

## License

MIT
