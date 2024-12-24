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
      <body>
        ${buildContent(title, content)}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto&family=Zilla+Slab&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap">
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
      <header class="container-fluid">
        <nav>
          <ul>
            <li><strong>Rahul Ravikumar's Blog</strong></li>
          </ul>
          <ul>
            <li><a href="/blog/toc.html" class="contrast">More Articles</a></li>
          </ul>
        </nav>
      </header>
      <main class="container">
        ${content}
        <section class="footer">
          <p>
          Rahul Ravikumar &nbsp;
            <a rel="me" href="https://github.com/tikurahul">GitHub</a> &nbsp; | &nbsp;
            <a rel="me" href="https://bsky.app/profile/rahulrav.com">Bluesky</a> &nbsp; | &nbsp;
            <a rel="me" href="https://www.linkedin.com/in/rahulrav/">LinkedIn</a> &nbsp; | &nbsp;
            <a rel="me" href="https://androiddev.social/@rahulrav">AndroidDev Mastodon</a> &nbsp; | &nbsp;
            <a rel="me" href="https://rahulrav.svbtle.com/">Svbtle</a> &nbsp; | &nbsp;
            <a rel="me" href="https://twitter.com/tikurahul">Twitter</a> &nbsp;
          </p>
        </section>
      </main>
    </div>
  `;

  return host;
}
