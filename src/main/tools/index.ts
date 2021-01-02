import { convert } from './convert';
import { MANIFEST_PATH, MARKDOWN_PATH, HTML_PATH } from './flags';
import { readFile } from 'fs';
import { log } from './logger';
import { isAbsolute, join, parse, resolve } from 'path';
import { Blogs } from './types';
import { promisify } from 'util';

const readFilePromisify = promisify(readFile);

function resolvePath(path: string, parent: string) {
  if (isAbsolute(path)) {
    return path;
  }

  return resolve(join(parent, path));
}

const parent = __dirname;
const markdown = resolvePath(MARKDOWN_PATH, parent);
const output = resolvePath(HTML_PATH, parent);
const manifest = resolvePath(MANIFEST_PATH, parent);

async function metadata(): Promise<Blogs> {
  const contents = await readFilePromisify(manifest, { encoding: 'utf-8' });
  return JSON.parse(contents) as Blogs;
}

(async function () {
  try {
    log('Rebuilding pages.');
    const blog = await metadata();
    for (var i = 0; i < blog.posts.length; i += 1) {
      const entry = blog.posts[i];
      const name = parse(entry.path).name;
      const html = `${name.toLocaleLowerCase()}.html`;
      const sourcePath = `${markdown}/${entry.path}`;
      const outputPath = `${output}/${html}`;
      log(entry.path, html);
      await convert(entry.title, sourcePath, outputPath);
    }
  } catch (error) {
    log('Something bad happened', error);
  }
})();
