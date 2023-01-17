import { random } from '../../lib/random';
import { Store } from '../store/store';

export function isComponent(c: any) {
  return typeof c === 'function' && c?.__COMPONENT;
}
export function isStore(c: any) {
  return typeof c === 'object' && c?.__STORE;
}

export function html(...data: any[]) {
  const strArray: string[] = data[0];
  const dataArray: any[] = data.slice(1);

  let returnHTML = '';

  strArray.forEach((str, index) => {
    let component = dataArray[index] || '';

    returnHTML += str;
    if (isComponent(component)) component = component();
    if (isStore(component)) {
      /* store */
      const hash = random();
      const store: Store<any> = component;

      component = `<span class="z-${hash}">${store.value}</span>`;

      store.onChange((newValue) => {
        try {
          document.querySelectorAll(`.z-${hash}`)[0].innerHTML = newValue;
        } catch (e) {
          console.warn(e);
        }
      });
    }
    if (Array.isArray(component)) {
      component = component.join('');
    }

    returnHTML += component;
  });

  return returnHTML;
}
