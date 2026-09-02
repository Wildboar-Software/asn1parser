/**
 * Parses every module under `test/data/modules` once, for use under a
 * profiler, e.g. `node --cpu-prof bench/profile.mjs`.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..');
const { parse } = await import(join(repoRoot, 'dist', 'index.mjs'));

const dir = join(repoRoot, 'test', 'data', 'modules');
const files = readdirSync(dir).filter((name) => name.endsWith('.asn1'));
const texts = [];
for (let i = 0; i < files.length; i++) {
  texts.push(readFileSync(join(dir, files[i]), 'utf-8'));
}

const rounds = Number(process.env.ROUNDS ?? 3);
for (let r = 0; r < rounds; r++) {
  for (let i = 0; i < texts.length; i++) {
    parse(texts[i]);
  }
}
