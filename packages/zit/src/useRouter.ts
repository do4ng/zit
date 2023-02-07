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

  const path = window.location.pathname;

  if (typeof window === 'undefined') return;

  /* init */

  window.onpopstate = (ev) => {
    if (path === window.location.pathname) {
      console.log('hash changed.');
    } else {
      useRouter(routing, target);
    }
  };

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
    if (component.beforeLoad) fetchedData = await component.beforeLoad({ params });

    /* function */
    if (typeof component.template === 'function' && component.template.__COMPONENT) {
      templateOutput = component.template({ ...params, ...fetchedData });
    }

    target.innerHTML = templateOutput as string;

    if (component.js) {
      // @ts-ignore
      const { params } = match(sorted[0].page)(window.location.pathname);

      await component.js(params);
    }
    // add a tags listener

    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (evt) => {
        if (!link.getAttribute('href')?.startsWith('#')) {
          console.log(window.location.pathname);
          window.history.pushState('page', 't', link.getAttribute('href') || null);
          evt.preventDefault();

          // re render
          useRouter(routing, target);
        }
      });
    });
  } else if ('__404' in routing) {
    // 404

    const component = routing.__404;
    let output = component.template;

    if (typeof component.template === 'function' && component.template.__COMPONENT) {
      output = component.template();
    }

    target.innerHTML = output;

    // warning

    if (component.js || component.beforeLoad) {
      console.warn("route.js or route.beforeLoad doesn't work in 404 page");
    }
  }
}

export { useRouter };
