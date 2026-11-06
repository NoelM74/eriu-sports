// Makes a 640px copy of every photo under public/images, in public/images/w640/ at the same path.
// Product grids and gallery thumbnails load these (see lib/image-loader.ts); full-size photos stay for product pages.
// Runs before every build. It only writes copies that are missing or whose photo changed size (tracked in
// scripts/thumbs-manifest.json, so a fresh clone does no work), and removes copies whose photo is gone.
import { readdir, stat, mkdir, unlink, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = 'public/images';
const OUT = path.join(ROOT, 'w640');

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (p !== OUT) out.push(...(await walk(p))); }
    else if (e.name.endsWith('.webp')) out.push(p);
  }
  return out;
}

async function walkAll(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walkAll(p)));
    else out.push(p);
  }
  return out;
}

const MANIFEST = 'scripts/thumbs-manifest.json';
const exists = (p) => stat(p).then(() => true, () => false);

let sharp;
try { sharp = (await import('sharp')).default; } catch { console.warn('make-thumbs: sharp not available, skipped'); process.exit(0); }

const photos = (await walk(ROOT)).sort();
const manifest = JSON.parse(await readFile(MANIFEST, 'utf8').catch(() => '{}'));
const next = {};
const wanted = new Set();
let made = 0;
for (const src of photos) {
  const dest = path.join(OUT, path.relative(ROOT, src));
  wanted.add(dest);
  const key = path.relative(ROOT, src);
  const size = (await stat(src)).size;
  next[key] = size;
  if (manifest[key] === size && (await exists(dest))) continue;
  await mkdir(path.dirname(dest), { recursive: true });
  await sharp(src).resize(640, 640, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 75 }).toFile(dest);
  made++;
}
let removed = 0;
for (const f of await walkAll(OUT).catch(() => [])) if (!wanted.has(f)) { await unlink(f); removed++; }
await writeFile(MANIFEST, JSON.stringify(next, null, 0).replace(/,"/g, ',\n"') + '\n');
console.log(`make-thumbs: ${made} made, ${removed} removed, ${photos.length} photos`);
