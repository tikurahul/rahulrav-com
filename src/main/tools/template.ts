import { MATERIAL_STYLES_URL, MATERIAL_JAVASCRIPT_URL, BLOG_STYLES_URL, BLOG_TABLE_OF_CONTENTS_URL, HIGHLIGHT_JS, HIGHLIGHT_STYLES } from './flags';

/**
 * Wraps the content inside a template.
 */
export function templated(title: string, content: string): string {
  const templated = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
        <title>${title}</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="${MATERIAL_STYLES_URL}">
        <link rel="stylesheet" href="${HIGHLIGHT_STYLES}">
        <link rel="stylesheet" href="${BLOG_STYLES_URL}">
      </head>
      <body class="mdl-layout mdl-js-layout">
        <header class="mdl-layout__header mdl-layout__header--scroll">
          <div class="mdl-layout__header-row">
            <span class="mdl-layout-title">${title}</span>
            <div class="mdl-layout-spacer"></div>
            <nav class="mdl-navigation">
              <a class="mdl-navigation__link" href="${BLOG_TABLE_OF_CONTENTS_URL}">More</a>
            </nav>
          </div>
        </header>
        <div class="mdl-layout__drawer">
          <span class="mdl-layout-title">Rahul's Blog</span>
          <nav class="mdl-navigation">
            <a class="mdl-navigation__link" href="${BLOG_TABLE_OF_CONTENTS_URL}">Other Articles</a>
          </nav>
        </div>
        <div class="content">
          <main class="mdl-layout__content">
            <div class="mdl-grid content">
              <div class="mdl-cell mdl-cell--8-col">
                ${content}
              </div>
            </div>
            <footer class="footer">
              <p>
                Rahul Ravikumar &nbsp;
                  <a href="https://github.com/tikurahul">GitHub</a> &nbsp; | &nbsp;
                  <a href="https://rahulrav.svbtle.com/">Svbtle</a> &nbsp; | &nbsp;
                  <a href="https://twitter.com/tikurahul">Twitter</a> &nbsp; | &nbsp;
                  <a href="https://www.linkedin.com/in/rahulrav/">LinkedIn</a>
              </p>
            </footer>
          </main>
          <script src="${MATERIAL_JAVASCRIPT_URL}"></script>
          <script src="${HIGHLIGHT_JS}"></script>
          <script type="text/javascript">
            // Highlight code snippets
            document.addEventListener('DOMContentLoaded', (event) => {
              document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
              });
            });
          </script>
        </div>
      </body>
    </html>
  `;
  return templated;
}
