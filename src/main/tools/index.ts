import { isAbsolute, join } from 'path';
import { convert } from './convert';
import { log } from './logger';

function resolvePath(path: string, parent: string) {
  if (isAbsolute(path)) {
    return path;
  }

  return join(parent, path);
}

(async function () {
  const parent = __dirname;

  if (process.argv.length < 5) {
    console.log(process.argv);
    log('Usage: node out/index.js title source destination');
  } else {
    try {
      const title = process.argv[2];
      const inputPath = process.argv[3];
      const outputPath = process.argv[4];
      const input = resolvePath(inputPath, parent);
      const output = resolvePath(outputPath, parent);
      await convert(title, input, output);
      log('Done');
    } catch (error) {
      log('Something bad happened.', error);
    }
  }
})();
