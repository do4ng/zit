import { ComponentData, HTML, Tag, ZitElement } from '../html';
import { MATCH_CURLY_BRACKET } from '../lib/match';
import { replaceDoubleQuote, replaceNewLine } from '../lib/replaceQuote';
import { isComponent } from './html';

function createVariables(data: object) {
  let code = '';
  Object.keys(data).forEach((key) => {
    data[key] = replaceDoubleQuote(data[key].toString());
    data[key] = replaceNewLine(data[key].toString());
    data[key] = data[key].replace(/\\\\/g, '\\');

    code += `var ${key} = "${data[key]}";`;
  });

  return code;
}

function runCode(data: object, code: string) {
  const running = `
  ${createVariables(data)};
  
  return ${code}`;
  let result = '';
  try {
    result = new Function(running)();
  } catch (e) {
    result = `{{${code}}}`;
  }

  return result;
}

function insertData(str: string, data: object) {
  let result = '';
  try {
    result = str.replace(MATCH_CURLY_BRACKET, (match) => runCode(data, match.slice(2, match.length - 2)));
  } catch (e) {
    /* empty */
  }
  return result;
}

function parseTagAttributes(t: Tag) {
  if (!t) return '';
  let attrString = '';

  if (t.attributes !== undefined) {
    Object.keys(t.attributes).forEach((key) => {
      // @ts-ignore
      if (t.attributes[key]) {
        // @ts-ignore
        attrString += `${key}="${t.attributes[key]}" `;
      } else {
        attrString += `${key} `;
      }
    });
  }

  return attrString.trimEnd();
}

export function createElement(
  tag: string | Tag | undefined | null,
  template: string | HTML,
  data?: object
  // eslint-disable-next-line no-unused-vars
): ZitElement {
  if (isComponent(template)) {
    template = (template as any)();
  } else if (typeof template !== 'string') {
    /* error */
    console.error(`${template} isn't supported component.`);
  }

  /* default */

  if (!data) data = {};

  /* change template type */

  const html: string = template as string;

  /* return string */

  const func = function (newData: ComponentData): string {
    let htmlCopy = html;

    if (!newData) newData = data || {};

    if (typeof newData === 'string') {
      /* slug: string */

      newData = { slug: newData };
    } else if (isComponent(newData)) {
      /* slug: func */

      newData = { slug: (newData as Function)() };
    }

    /* data */
    htmlCopy = insertData(htmlCopy, newData);

    /* parse tag data */

    if (typeof tag === 'string') {
      tag = {
        tag,
        attributes: {},
      };
    } else if (typeof tag === 'object') {
      tag = { ...tag, tag: tag?.tag || tag?.tagName || null };
    }
    if (!tag) {
      tag = {};
    }

    const stringTag = `${tag.tag ? `<${tag.tag} ${parseTagAttributes(tag as any)}>` : ''}
    ${htmlCopy}
    ${tag.tag ? `</${tag.tag}>` : ''}`;

    // console.log(stringTag);

    return stringTag;
  };

  func.__COMPONENT = true;

  func.init = function (fn: () => void) {
    fn();
  };

  // @ts-ignore
  return func;
}
