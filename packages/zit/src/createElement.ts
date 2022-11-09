import { ComponentData, HTML, Tag, ZitElement } from '../html';
import { MATCH_CURLY_BRACKET } from '../lib/match';
import { replaceDoubleQuote, replaceNewLine } from '../lib/replaceQuote';
import { isComponent, isComponentFunc } from './html';
import { HTMLtoString } from './html/transform';

function createVariables(data: object) {
  let code = '';

  Object.keys(data).forEach((key) => {
    data[key] = replaceDoubleQuote(data[key]);
    data[key] = replaceNewLine(data[key]);

    if (typeof data[key] === 'string') data[key] = `"${data[key]}"`;
    code += `var ${key} = ${data[key]};`;
  });

  return code;
}

function runCode(data: object, code: string) {
  return new Function(`
  ${createVariables(data)};
  
  return ${code}`)();
}

function insertData(str: string, data: object) {
  return str.replace(MATCH_CURLY_BRACKET, (match) => runCode(data, match.slice(2, match.length - 2)));
}

function parseTagAttributes(t: Tag) {
  let attrString = '';

  if (t.attributes !== undefined) {
    Object.keys(t.attributes).forEach((key) => {
      // @ts-ignore
      if (t.attributes[key]) {
        // @ts-ignore
        attrString += `${key}=${t.attributes[key]} `;
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
    template = HTMLtoString(template as HTML);
  } else if (isComponentFunc(template)) {
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
      /* slug: component */

      newData = { slug: HTMLtoString(newData as HTML) };
    } else if (isComponentFunc(newData)) {
      /* slug: func */

      newData = { slug: (newData as Function)() };
    }

    /* data */

    htmlCopy = insertData(htmlCopy, newData);

    /* parse tag data */

    if (typeof tag === 'string') {
      tag = {
        tagName: tag,
        attributes: {},
      };
    }
    if (!tag) {
      tag = {};
    }

    const stringTag = `${tag.tagName ? `<${tag.tagName} ${parseTagAttributes(tag.attributes as any)}>` : ''}
    ${htmlCopy}
    ${tag.tagName ? `</${tag.tagName}>` : ''}`;

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
