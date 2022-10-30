const zit = require('zitjs');

const components = {};

/**
 * ```js
 * const greet = createElement("h1", "hello world");
 * html`${fragment(greet)}`; // <h1>hello world</h1>
 * ```
 */
components.fragment = zit.createElement(null, '{{slug}}');

module.exports = components;
