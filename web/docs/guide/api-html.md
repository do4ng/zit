# HTML

To create layout, use `html`

## Usage

```ts
import { html, createElement } from 'zitjs';

html`Hello World`; // Hello World

const component = createElement(null, 'pong');
html`ping ${component}`; // ping pong

const container = createElement(null, 'ping {{slug}}');
html`${container('pong')}`; // ping pong
```
