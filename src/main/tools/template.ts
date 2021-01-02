import { HIGHLIGHT_JS, HIGHLIGHT_STYLES } from './flags';


/**
 * Wraps the content in the MarkDown into this HTML file.
 */
export function buildPage(title: string, content: string): string {
  const html = `
  <!doctype html>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
        <link rel="preconnect" href="https://fonts.gstatic.com">
      </head>
      <body class="mdc-typography">
        ${buildContent(title, content)}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&family=Zilla+Slab&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="${HIGHLIGHT_STYLES}">
        <link rel="stylesheet" href="/assets/core/page.css">
        <script type="text/javascript" src="/assets/core/page.js"></script>
        <script type="text/javascript" src="${HIGHLIGHT_JS}"></script>
        <script type="text/javascript">
          // Highlight code snippets
          document.addEventListener('DOMContentLoaded', (event) => {
            document.querySelectorAll('pre code').forEach((block) => {
              hljs.highlightBlock(block);
            });
          });
        </script>
      </body>
    </html>
  `;

  return html;
}

function buildContent(title: string, content: string) {
  const host = `
    <aside class="mdc-drawer mdc-drawer--dismissible">
      <div class="mdc-drawer__header">
        <h3 class="mdc-drawer__title">Rahul's Blog</h3>
      </div>
      <div class="mdc-drawer__content">
        <div class="mdc-list">
          <li class="mdc-list-item" tabindex="0">
            <span class="mdc-list-item__ripple"></span>
            <span class="mdc-list-item__text">Other articles</span>
          </li>
        </div>
      </div>
    </aside>

    <div class="mdc-drawer-app-content">
      <header class="mdc-top-app-bar app-bar" id="app-bar">
        <div class="mdc-top-app-bar__row">
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button">menu</button>
            <span class="mdc-top-app-bar__title">${title}</span>
          </section>
          <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
            <span>
              <a href="/blog/toc.html">More</a>
            </span>
          </section>
        </div>
      </header>

      <main class="main-content" id="main-content">
        <div class="mdc-top-app-bar--fixed-adjust">
          <section class="content">
            ${content}
            <section class="footer">
              <p>
              Rahul Ravikumar &nbsp;
                <a href="https://github.com/tikurahul">GitHub</a> &nbsp; | &nbsp;
                <a href="https://rahulrav.svbtle.com/">Svbtle</a> &nbsp; | &nbsp;
                <a href="https://twitter.com/tikurahul">Twitter</a> &nbsp; | &nbsp;
                <a href="https://www.linkedin.com/in/rahulrav/">LinkedIn</a>
              </p>
            </section>
          </section>
        </div>
      </main>
    </div>
  `;

  return host;
}
