import fs = require('fs');
import { log } from './logger';
import { Converter } from 'showdown';
import { buildPage } from './template';
import { promisify } from 'util';

const classes = {
  'img': 'card mdc-card mdc-card__media mdc-card__media--16-9'
}

type Keys = keyof typeof classes;

function regexp(key: Keys) {
  return RegExp(`<${key}(.*)>`, 'g');
}

function replacement(key: Keys) {
  return `<${key} class="${classes[key]}" $1>`;
}

function isExtensionKey(key: string): key is Keys {
  return classes.hasOwnProperty(key);
}

const fileReader = promisify(fs.readFile);
const fileWriter = promisify(fs.writeFile);

/**
 * Converts Markdown from the source path to a destination path.
 */
export async function convert(title: string, source: string, destination: string) {
  const extensions = [];
  for (const key in classes) {
    if (isExtensionKey(key)) {
      extensions.push({
        type: 'output',
        regex: regexp(key),
        replace: replacement(key)
      });
    }
  }
  const converter = new Converter({
    extensions: [
      ...extensions,
      // Inline prettify extension
      {
        type: 'output',
        filter: function (source) {
          return source.replace(/(<pre[^>]*>)?[\n\s]?<code([^>]*)>/gi, function (match, pre, codeClass) {
            if (pre) {
              return '<pre class="prettyprint linenums"><code' + codeClass + '>';
            } else {
              return ' <code class="prettyprint">';
            }
          });
        }
      }
    ],
  });

  converter.setFlavor('github');
  const markdown = await fileReader(source, { encoding: 'utf-8' });
  const contents = converter.makeHtml(markdown);
  const result = buildPage(title, contents);
  await fileWriter(destination, result, {
    encoding: 'utf-8'
  });
}
