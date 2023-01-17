import { html } from '../zitjs';

export default html`
  <div id="header">
    <div id="header-container">
      <div id="header-title">zit.js</div>

      <ul id="header-contents">
        <li>
          <a href="/guide/getting-started">guide</a>
        </li>
        <li>
          <a href="https://github.com/do4ng/zit">github</a>
        </li>
      </ul>
    </div>
  </div>

  <div id="main">
    <div id="title">
      <div class="flex-container">
        <div>
          <div id="title-content">
            <h1>zit.js</h1>
            <p id="title-detail">Fast, Light, Easy Javascript Web Framework</p>
            <div id="title-dir">
              <button class="tb shadow">
                <a href="/guide/getting-started">get started</a>
              </button>
              <button class="tb shadow">
                <a href="https://github.com/do4ng/zit">view on github</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="example"></div>
  </div>
`;
