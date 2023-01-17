/* eslint-disable class-methods-use-this */
export interface ComponentOptions {
  name?: string;
}

export class ZitComponent {
  public component: ComponentOptions = {};

  render() {
    return '';
  }
}

export function defineComponent(component: typeof ZitComponent) {
  const c = new component();
  const el = class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.innerHTML = c.render();
    }
  };
  window.customElements.define(c.component.name, el);
}
