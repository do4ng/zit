// @ts-ignore
import { createElement, html } from '../zitjs';
import { markdownToHtml } from '../markdown';

import posts from './config.json';

const postList: string[] = [];
const titleList: string[] = [];

posts.forEach((post) => {
  post.posts.forEach((p) => {
    postList.push(p[0]);
    titleList.push(p[1]);
  });
});

let sliced = window.location.href.split('/');
let now = sliced[sliced.length - 1];
let next = postList[postList.indexOf(now) + 1];
let pre = postList[postList.indexOf(now) - 1];

const sideList = createElement(
  { tagName: 'div', attributes: { class: 'side-list' } },
  `
<div class="logo"><a href="/" class="no-a">zit <span class="logo-docs">docs</span></a></div>
${posts.map(
  (category) => html` <div class="category">
    <div class="category-name">${category.category}</div>
    <div class="category-content">
      ${category.posts.map(
        (post) => html` <div class="category-post">
          <a href="/guide/${post[0]}" class="${post[0] === now ? 'active-post' : ''}">${post[1]}</a>
        </div>`
      )}
    </div>
  </div>`
)}
`
);
console.log(pre, next, now);
const post = createElement(
  { tagName: 'div', attributes: { class: 'post-container' } },
  html`<div class="post">
    {{text}}
    <div class="pre-next">{{prePage}} {{nextPage}}</div>
  </div>`
);

const template = createElement({ tagName: 'div', attributes: { class: 'container' } }, html`${sideList}${post()}`);

export default {
  template,
  beforeLoad: async ({ params }) => {
    // update data
    sliced = window.location.href.split('/');
    now = sliced[sliced.length - 1];
    next = postList[postList.indexOf(now) + 1];
    pre = postList[postList.indexOf(now) - 1];
    console.log(sliced, now, next, pre, postList.indexOf(now));
    const app = await fetch(`/guide/${params.slug}.md`);

    const text = await app.text();

    return {
      text: markdownToHtml(text).html,
      prePage: pre ? `<a href="/guide/${pre}" pre>Previous Page</a>` : '',
      nextPage: next ? `<a href="/guide/${next}" next>Next Page</a>` : '',
    };
  },
  js: () => {},
};
