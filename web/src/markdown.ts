/* eslint-disable newline-per-chained-call */
import * as unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import html from 'rehype-stringify';
import rehypeHighlight from 'rehype-highlight';

export function markdownToHtml(data: string) {
  const htmlText = unified.unified().use(markdown).use(remark2rehype).use(html).use(rehypeHighlight).processSync(data);
  return {
    html: htmlText.toString(),
  };
}
