export interface CSS {
  __CSS: boolean;
  styleSheet: string;
}

export interface OriginHTML {
  [0]: string[];
  [key: number]: any;
}

export interface HTML {
  __HTML: boolean;
  template: string;
  origin: OriginHTML;
}

export type ComponentData = string | object | null | Function | HTML;

export interface Tag {
  tag?: string;
  /**
   * same: `tag`
   */
  tagName?: string;
  attributes?: object;
}

export type ZitElement = (newData?: ComponentData) => string;
