import hljs from 'highlight.js';
import { html } from './zitjs';

const editor = (code: string, result: string) => {
  const htmlResult = hljs.highlightAuto(code).value;

  return html`
    <div class="editor">
      <div class="editor-code hljs">
        <pre><code>${htmlResult}</code></pre>
      </div>
      <div class="editor-result">${result}</div>
    </div>
  `;
};

export { editor };
