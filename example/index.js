/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import * as zit from '../packages/zit/dist';

const [count, setCount] = zit.useStore(0);

const app = document.getElementById('app');
const introduce = zit.createElement('h1', '<h1>Greeting</h1>');
const greet = zit.createElement('div', '<div>hello, {{name}}</div>', { name: 'world' });
const container = zit.createElement('div', '<div>{{slug}}</div>');

const result = zit.createElement(
  null,
  zit.html`${introduce}
    <p>name: world</p>
    ${container(greet)}
    <p>name: cat</p>
    ${greet({ name: 'cat' })}

    <button id="up">+</button>
    <button id="down">-</button>

    ${count} `
);

/*

main

*/

const user = zit.createElement(null, "<strong>{{user}}</strong>'s page");

const routing = {
  // main
  '/': {
    template:
      // eslint-disable-next-line no-multi-str
      '<h1>Hello World!</h1>\
      <a href="/counter">Counter</a> <a href="/users/0">user 0</a> <a href="/users/1">user 1</a>',
  },
  // counter
  '/counter': {
    template: result,
    js: () => {
      function up() {
        setCount((pre) => pre + 1);
      }
      function down() {
        setCount((pre) => pre - 1);
      }

      document.getElementById('up').addEventListener('click', up);
      document.getElementById('down').addEventListener('click', down);
    },
  },
  // users
  '/users/:user': {
    template: user,
  },
};

zit.useRouter(routing, app);
