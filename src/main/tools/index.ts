import { convert } from './convert';
import chokidar = require('chokidar');
import { MARKDOWN_PATH, HTML_PATH } from './flags';
import { exists } from 'fs';
import { log } from './logger';
import { isAbsolute, join, parse } from 'path';
import { promisify } from 'util';

function resolvePath(path: string, parent: string) {
  if (isAbsolute(path)) {
    return path;
  }

  return join(parent, path);
}

(function () {
  const parent = __dirname;
  const input = resolvePath(MARKDOWN_PATH, parent);
  const output = resolvePath(HTML_PATH, parent);
  const watcher = chokidar.watch(input);
  const existsPromisify = promisify(exists);

  watcher.on('all', async (event, path) => {
    const valid = await existsPromisify(path);
    if (!path.endsWith('.md') || !valid) {
      // Filter out things that are not markdown
      return;
    }

    const parsed = parse(path);
    const name = parsed.name;
    // Split parts by _ and capitalize them for the title
    const capitalized = name.split('_').map(part => {
      const first = part.charAt(0);
      const rest = part.substring(1);
      return `${first.toLocaleUpperCase()}${rest}`;
    });
    const title = capitalized.join(' ');
    try {
      const outputPath = `${output}/${name.toLocaleLowerCase()}.html`
      await convert(title, path, outputPath);
      log(`${outputPath}`);
    } catch (error) {
      log('Something bad happened.', error);
    }
  });

  log(`Watching ${input} folder.`)
})();
