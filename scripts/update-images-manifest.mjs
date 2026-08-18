#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const projectRoot = process.cwd();
const imagesDir = path.join(projectRoot, 'public', 'images');
const manifestPath = path.join(projectRoot, 'public', 'images-manifest.json');
const ignored = new Set(['.gitkeep', 'README.md', '.DS_Store', 'Thumbs.db']);

function md5ForFile(filePath) {
  const hash = crypto.createHash('md5');
  hash.update(fs.readFileSync(filePath));
  return hash.digest('hex');
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
    const stats = fs.statSync(fullPath);
    files.push({
      path: relativePath,
      size: stats.size,
      etag: md5ForFile(fullPath),
    });
  }

  return files;
}

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const manifest = walk(imagesDir, imagesDir).sort((a, b) => a.path.localeCompare(b.path));
fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Updated public/images-manifest.json with ${manifest.length} image(s)`);
