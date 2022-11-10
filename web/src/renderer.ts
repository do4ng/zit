import * as zit from './zitjs';

import 'highlight.js/styles/base16/material.css';

import MainPage from './pages';
import docs from './pages/guide';
import page404 from './pages/404';

import '../styles/documents.scss';

zit.useRouter(
  {
    '/': {
      template: MainPage,
    },
    '/guide/:slug': docs,
    __404: page404,
  },
  document.getElementById('app') as HTMLElement
);
