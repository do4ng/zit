# Getting Started

> 🚀 v1.1 is in beta! - [see more](migration-1-1)

## Overview

Zit.js is very simple Javascript Framework to build basic site.

This package was born because many frameworks (like [React](https://reactjs.org)) are so heavy to build simple web.  
So this package is not suitable for heavy projects. Instead, it is quick and easy.

And unlike other frameworks, zitjs applies HTML code to the DOM directly.  
In other words, zitjs skips parse step. This feature helps reducing bundled code.

### Features

- **Easy and simple.** This package doesn't require any environment (such as node, deno). You can make your own web app instantly.

- **Routing.** Routing Function is very experimental, but you don't have to install any routing library for routing.

## Installation

with [cdn](https://www.unpkg.com/zitjs)

```html
<script src="https://unpkg.com/zitjs/dist/browser.js" type="module"></script>
```

```js
const { html, createElement } = window.zitjs;
```

with [npm](https://www.npmjs.com/package/zitjs)

```bash
# via npm
$ npm install --save-dev zitjs

# via yarn
$ yarn add -D zitjs
```

## What's next?

We will make simple blog using router
