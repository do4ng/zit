# Use Store

> `useStore()` is experimental function.

## Usage

```ts
const [count, setCount] = zit.useStore(0);

document.body.innerHTML = zit.html`
    <button id="up">+</button>
    <button id="down">-</button>

    ${count} `;

function up() {
  setCount((pre) => pre + 1);
}
function down() {
  setCount((pre) => pre - 1);
}

document.getElementById('up').addEventListener('click', up);
document.getElementById('down').addEventListener('click', down);
```
