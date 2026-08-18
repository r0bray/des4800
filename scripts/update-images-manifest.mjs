#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const imagesDir = path.join(projectRoot, 'public', 'images');
const manifestPath = path.join(projectRoot, 'public', 'images-manifest.json');
const ignored = new Set(['.gitkeep', 'README.md', '.DS_Store', 'Thumbs.db']);

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

    files.push(path.relative(baseDir, fullPath).split(path.sep).join('/'));
  }

  return files;
}

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const manifest = walk(imagesDir, imagesDir).sort((a, b) => a.localeCompare(b));
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Updated public/images-manifest.json with ${manifest.length} image(s)`);
