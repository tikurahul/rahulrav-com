import { convert } from './convert';
import chokidar = require('chokidar');
import { MANIFEST_PATH, MARKDOWN_PATH, HTML_PATH } from './flags';
import { exists, readFile } from 'fs';
import { log } from './logger';
import { isAbsolute, join, parse } from 'path';
import { Blogs, Post } from './types';
import { promisify } from 'util';

const existsPromisify = promisify(exists);
const readFilePromisify = promisify(readFile);

function resolvePath(path: string, parent: string) {
  if (isAbsolute(path)) {
    return path;
  }

  return join(parent, path);
}

const parent = __dirname;
const input = resolvePath(MARKDOWN_PATH, parent);
const output = resolvePath(HTML_PATH, parent);
const manifest = resolvePath(MANIFEST_PATH, parent);

async function metadataFor(path: string): Promise<Post | undefined> {
  try {
    const contents = await readFilePromisify(manifest, { encoding: 'utf-8' });
    const blog = JSON.parse(contents) as Blogs;
    return blog.posts.find(post => post.path === path);
  } catch (error) {
    log('Error reading manifest', error);
  }
}

(async function () {
  const watcher = chokidar.watch(input);
  watcher.on('all', async (event, path) => {
    const valid = await existsPromisify(path);
    if (!valid) {
      return;
    }

    const parsed = parse(path);
    const name = parsed.name;
    const metadata = await metadataFor(`${name}.md`);

    if (!metadata) {
      return;
    }

    try {
      const outputPath = `${output}/${name.toLocaleLowerCase()}.html`
      await convert(metadata.title, path, outputPath);
      log(`${outputPath}`);
    } catch (error) {
      log('Something bad happened.', error);
    }
  });

  log(`Watching ${input} folder.`)
})();
