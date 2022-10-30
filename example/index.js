/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import * as zite from '../packages/zit/dist';

console.log(zite);

const [count, setCount] = zite.useStore(0);

const app = document.getElementById('app');
const introduce = zite.createElement('h1', '<h1>Greeting</h1>');
const greet = zite.createElement('div', '<div>hello, {{name}}</div>', { name: 'world' });
const container = zite.createElement('div', '<div>{{slug}}</div>');

const result = zite.html`${introduce}
  <p>name: world</p>
  ${container(greet)}
  <p>name: cat</p>
  ${greet({ name: 'cat' })}
  
  <button id="up">+</button>
  <button id="down">-</button>

  ${count}
  `;

app.innerHTML = result;

// counter

function up() {
  setCount((pre) => pre + 1);
}
function down() {
  setCount((pre) => pre - 1);
}

document.getElementById('up').addEventListener('click', up);
document.getElementById('down').addEventListener('click', down);
