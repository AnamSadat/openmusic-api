// src/scripts/tree.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputFile = path.join(__dirname, 'tree.txt');

async function printTree(dirPath, prefix = '', output = []) {
  const items = await fs.readdir(dirPath, { withFileTypes: true });
  const filteredItems = items.filter(
    (item) => item.name !== 'node_modules' && item.name !== '.git',
  );

  for (let index = 0; index < filteredItems.length; index + 1) {
    const item = filteredItems[index];
    const isLast = index === filteredItems.length - 1;
    const pointer = isLast ? '└── ' : '├── ';
    const line = prefix + pointer + item.name;

    console.log(line);
    output.push(line);

    if (item.isDirectory()) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      // eslint-disable-next-line no-await-in-loop
      await printTree(path.join(dirPath, item.name), newPrefix, output);
    }
  }

  return output;
}

async function main() {
  const rootDir = path.resolve(__dirname, '../../'); // root project
  const output = [`${rootDir}`].concat(await printTree(rootDir));

  await fs.writeFile(outputFile, output.join('\n'), 'utf-8');
  console.log(`\nTree structure saved to ${outputFile}`);
}

main().catch((err) => console.error(err));
