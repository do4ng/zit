/* eslint-disable no-unused-vars */
import { match } from 'path-to-regexp';

interface Routing {
  [key: string]: {
    template: any;
    js?: (params: object) => void;
    beforeLoad?: ({ params }: { params: object }) => Promise<object> | object;
  };
}

async function useRouter(routing: Routing, target: HTMLElement) {
  /* debug */
  /*
  Object.keys(routing).forEach((route) => console.log(route, routing[route].template));
  */

  if (typeof window === 'undefined') return;

  /* init */

  window.addEventListener('popstate', () => {
    useRouter(routing, target);
  });

  /* find matched pages */

  const matchedPages: string[] = [];

  Object.keys(routing).forEach((route) => {
    const matched = match(route)(window.location.pathname);

    if (matched) {
      matchedPages.push(route);
    }
  });

  /*
  /users/special/:params <= show
  /users/:user/about
  */

  if (matchedPages.length !== 0) {
    const matchedPagesLevels: Array<{ page: string; level: number }> = [];

    matchedPages.forEach((page) => {
      let level = 9999999999;
      page.split('/').forEach((path, index) => {
        if (path.includes(':')) level -= index + 1;
      });

      matchedPagesLevels.push({
        page,
        level,
      });
    });

    // @ts-ignore
    const sorted = matchedPagesLevels.sort((a, b) => a.level - b.level).reverse();
    const component = routing[sorted[0].page];
    let params = {};

    /* load data */

    let fetchedData = {};

    /* params */

    // @ts-ignore
    params = match(sorted[0].page)(window.location.pathname).params;

    let templateOutput = component.template;

    /* function */
    if (typeof component.template === 'function' && component.template.__COMPONENT) {
      templateOutput = component.template({ ...params, ...fetchedData });
    }

    if (component.beforeLoad) fetchedData = await component.beforeLoad({ params });

    target.innerHTML = templateOutput as string;

    // add a tags listener

    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (evt) => {
        window.history.pushState('page', 't', link.getAttribute('href') || null);
        evt.preventDefault();

        // re render
        useRouter(routing, target);
      });
    });

    if (component.js) {
      // @ts-ignore
      const { params } = match(sorted[0].page)(window.location.pathname);

      component.js(params);
    }
  }
}

export { useRouter };
