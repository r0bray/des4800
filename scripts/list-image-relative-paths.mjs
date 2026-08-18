#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const imagesDir = path.join(projectRoot, 'public', 'images');
const ignored = new Set(['.gitkeep', 'README.md', '.DS_Store', 'Thumbs.db']);

function isInvalidRelativePath(relativePath) {
  return relativePath.startsWith('Users/') || relativePath.includes('/public/images/');
}

function walk(dir, baseDir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(fullPath, baseDir));
      continue;
    }

    if (!entry.isFile() || ignored.has(entry.name)) {
      continue;
    }

    const relativePath = path.relative(baseDir, fullPath).split(path.sep).join('/');
    if (isInvalidRelativePath(relativePath)) {
      continue;
    }
    files.push(relativePath);
  }

  return files;
}

if (!fs.existsSync(imagesDir)) {
  process.exit(0);
}

for (const relativePath of walk(imagesDir, imagesDir).sort((a, b) => a.localeCompare(b))) {
  console.log(relativePath);
}
