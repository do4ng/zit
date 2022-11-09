import { html } from '../src';

export function compiler(...data: any[]) {
  const result: any = [[]];
  data.forEach((d, index) => {
    if (index % 2 === 0) {
      result[0].push(d);
    } else {
      result.push(d);
    }
  });

  return html(result);
}
