/**
 * Benchmark for the lexing and parsing pipeline.
 *
 * Parses every ASN.1 module under `test/data/modules` a number of times and
 * reports wall-clock timings. Lexing is timed separately so that the parser's
 * share of the total can be derived, since parser changes should not move the
 * lexing number.
 *
 * Usage: node bench/parse.bench.mjs [--iterations N] [--warmup N] [--json FILE]
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(here, '..');

function parseArgs(argv) {
  const options = {
    iterations: 10,
    warmup: 3,
    json: null,
    dist: join(repoRoot, 'dist'),
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--iterations') options.iterations = Number(argv[++i]);
    else if (arg === '--warmup') options.warmup = Number(argv[++i]);
    else if (arg === '--json') options.json = argv[++i];
    else if (arg === '--dist') options.dist = argv[++i];
  }
  return options;
}

function loadModules() {
  const dir = join(repoRoot, 'test', 'data', 'modules');
  const files = readdirSync(dir)
    .filter((name) => name.endsWith('.asn1'))
    .sort();
  const modules = [];
  for (let i = 0; i < files.length; i++) {
    modules.push({
      name: files[i],
      text: readFileSync(join(dir, files[i]), 'utf-8'),
    });
  }
  return modules;
}

function lexAll(modules) {
  let tokens = 0;
  for (let i = 0; i < modules.length; i++) {
    tokens += Array.from(lex(modules[i].text)).length;
  }
  return tokens;
}

function lexAndParseAll(modules) {
  let nodes = 0;
  for (let i = 0; i < modules.length; i++) {
    const result = parse(modules[i].text);
    nodes += result.cst ? 1 : 0;
  }
  return nodes;
}

function time(fn, iterations) {
  const samples = [];
  for (let i = 0; i < iterations; i++) {
    const start = process.hrtime.bigint();
    fn();
    const end = process.hrtime.bigint();
    samples.push(Number(end - start) / 1e6);
  }
  return samples;
}

function summarize(samples) {
  const sorted = samples.slice().sort((a, b) => a - b);
  let total = 0;
  for (let i = 0; i < sorted.length; i++) total += sorted[i];
  const mean = total / sorted.length;
  let variance = 0;
  for (let i = 0; i < sorted.length; i++) {
    variance += (sorted[i] - mean) ** 2;
  }
  return {
    min: sorted[0],
    max: sorted[sorted.length - 1],
    median: sorted[Math.floor(sorted.length / 2)],
    mean,
    stddev: Math.sqrt(variance / sorted.length),
  };
}

function format(ms) {
  return `${ms.toFixed(1)} ms`;
}

function report(label, stats) {
  console.log(
    `${label.padEnd(18)} median ${format(stats.median).padStart(10)}` +
      `   mean ${format(stats.mean).padStart(10)}` +
      `   min ${format(stats.min).padStart(10)}` +
      `   stddev ${format(stats.stddev).padStart(9)}`
  );
}

const options = parseArgs(process.argv.slice(2));
const { lex, parse } = await import(
  pathToFileURL(resolve(options.dist, 'index.mjs')).href
);
const modules = loadModules();
let bytes = 0;
for (let i = 0; i < modules.length; i++) bytes += modules[i].text.length;

console.log(
  `${modules.length} modules, ${(bytes / 1024).toFixed(0)} KiB, ` +
    `${options.warmup} warmup + ${options.iterations} timed iterations\n`
);

time(() => lexAll(modules), options.warmup);
const lexSamples = time(() => lexAll(modules), options.iterations);

time(() => lexAndParseAll(modules), options.warmup);
const totalSamples = time(() => lexAndParseAll(modules), options.iterations);

const lexStats = summarize(lexSamples);
const totalStats = summarize(totalSamples);
const parseStats = {
  min: totalStats.min - lexStats.min,
  max: totalStats.max - lexStats.max,
  median: totalStats.median - lexStats.median,
  mean: totalStats.mean - lexStats.mean,
  stddev: Math.sqrt(totalStats.stddev ** 2 + lexStats.stddev ** 2),
};

report('lex only', lexStats);
report('lex + parse', totalStats);
report('parse (derived)', parseStats);

if (options.json) {
  writeFileSync(
    options.json,
    JSON.stringify(
      { modules: modules.length, bytes, lex: lexStats, total: totalStats, parse: parseStats },
      null,
      2
    )
  );
  console.log(`\nWrote ${options.json}`);
}
