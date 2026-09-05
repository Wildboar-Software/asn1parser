import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { deepStrictEqual, ok, strictEqual } from 'node:assert';
import { describe, test } from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const cli = join(root, 'dist', 'cli.mjs');
const simple = join(root, 'test', 'data', 'modules', '_simple.asn1');
const pkg = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8'));

/**
 * @param {string[]} args
 */
function run(args) {
  return spawnSync(process.execPath, [cli, ...args], {
    encoding: 'utf8',
  });
}

describe('CLI', () => {
  test('package.json exposes the asn1parser bin', () => {
    strictEqual(pkg.bin.asn1parser, './dist/cli.mjs');
  });

  test('--help, -h, and help print usage and exit 0', () => {
    for (const args of [['--help'], ['-h'], ['help']]) {
      const result = run(args);
      strictEqual(result.status, 0, args.join(' '));
      ok(result.stdout.includes('Usage: asn1parser'), args.join(' '));
      ok(result.stdout.includes('lex'), args.join(' '));
    }
  });

  test('help lex and lex --help print lex usage', () => {
    for (const args of [['help', 'lex'], ['lex', '--help'], ['--help', 'lex']]) {
      const result = run(args);
      strictEqual(result.status, 0, args.join(' '));
      ok(result.stdout.includes('Usage: asn1parser lex'), args.join(' '));
    }
  });

  test('--version and version print the package version', () => {
    for (const args of [['--version'], ['version']]) {
      const result = run(args);
      strictEqual(result.status, 0, args.join(' '));
      strictEqual(result.stdout, `${pkg.version}\n`, args.join(' '));
    }
  });

  test('lex prints lexical tokens as JSON', () => {
    const result = run(['lex', simple]);
    strictEqual(result.status, 0, result.stderr);
    const tokens = JSON.parse(result.stdout);
    ok(Array.isArray(tokens));
    ok(tokens.length > 0);
    strictEqual(typeof tokens[0].type, 'string');
    ok('location' in tokens[0]);
    ok(Array.isArray(tokens[0].children));
  });

  test('cst prints the concrete syntax tree as JSON', () => {
    const result = run(['cst', simple]);
    strictEqual(result.status, 0, result.stderr);
    const cst = JSON.parse(result.stdout);
    strictEqual(cst.type, 'document');
    ok(Array.isArray(cst.children));
  });

  test('ast prints the corrected and normalized AST as JSON', () => {
    const result = run(['ast', simple]);
    strictEqual(result.status, 0, result.stderr);
    const modules = JSON.parse(result.stdout);
    strictEqual(modules.length, 1);
    strictEqual(modules[0].name, 'A');
    ok(Array.isArray(modules[0].definedEnumItems));
    ok('B' in modules[0].assignments);
  });

  test('check prints ok and exits 0', () => {
    const result = run(['check', simple]);
    strictEqual(result.status, 0, result.stderr);
    strictEqual(result.stdout, 'ok\n');
  });

  test('-p pretty-prints JSON with tabs', () => {
    const compact = run(['lex', simple]);
    const pretty = run(['lex', '-p', simple]);
    const prettyBefore = run(['--pretty', 'lex', simple]);
    strictEqual(compact.status, 0);
    strictEqual(pretty.status, 0);
    strictEqual(prettyBefore.status, 0);
    ok(pretty.stdout.includes('\n\t'));
    ok(prettyBefore.stdout.includes('\n\t'));
    ok(!compact.stdout.includes('\n\t'));
    deepStrictEqual(JSON.parse(pretty.stdout), JSON.parse(compact.stdout));
  });

  test('-o writes output to a file instead of stdout', () => {
    const dir = mkdtempSync(join(tmpdir(), 'asn1parser-cli-'));
    try {
      const out = join(dir, 'tokens.json');
      const result = run(['lex', '-o', out, simple]);
      strictEqual(result.status, 0, result.stderr);
      strictEqual(result.stdout, '');
      const written = readFileSync(out, 'utf8');
      ok(written.endsWith('\n'));
      const tokens = JSON.parse(written);
      ok(Array.isArray(tokens));
      ok(tokens.length > 0);

      const checkOut = join(dir, 'ok.txt');
      const check = run(['check', '--output', checkOut, simple]);
      strictEqual(check.status, 0, check.stderr);
      strictEqual(readFileSync(checkOut, 'utf8'), 'ok\n');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test('concatenates multiple files', () => {
    const dir = mkdtempSync(join(tmpdir(), 'asn1parser-cli-'));
    try {
      const second = join(dir, 'b.asn1');
      writeFileSync(second, 'Bee {iso} DEFINITIONS ::= BEGIN Cee ::= BOOLEAN END\n');

      const once = run(['lex', simple]);
      const twice = run(['lex', simple, second]);
      strictEqual(once.status, 0, once.stderr);
      strictEqual(twice.status, 0, twice.stderr);
      ok(JSON.parse(twice.stdout).length > JSON.parse(once.stdout).length);

      const ast = run(['ast', simple, second]);
      strictEqual(ast.status, 0, ast.stderr);
      const modules = JSON.parse(ast.stdout);
      deepStrictEqual(modules.map((m) => m.name), ['A', 'Bee']);

      const check = run(['check', simple, second]);
      strictEqual(check.status, 0, check.stderr);
      strictEqual(check.stdout, 'ok\n');
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test('bad input exits 1', () => {
    const dir = mkdtempSync(join(tmpdir(), 'asn1parser-cli-'));
    try {
      const bad = join(dir, 'bad.asn1');
      writeFileSync(bad, 'this is not asn.1 @@@@\n');
      for (const command of ['cst', 'ast', 'check']) {
        const result = run([command, bad]);
        strictEqual(result.status, 1, command);
        ok(result.stderr.length > 0, command);
        strictEqual(result.stdout, '', command);
      }
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });

  test('missing files, unknown command, and missing -o value exit 2', () => {
    const missingFiles = run(['lex']);
    strictEqual(missingFiles.status, 2);
    ok(missingFiles.stderr.includes('missing FILE'));

    const unknown = run(['nope', simple]);
    strictEqual(unknown.status, 2);
    ok(unknown.stderr.includes("unknown command 'nope'"));

    const missingOutput = run(['lex', '-o']);
    strictEqual(missingOutput.status, 2);
    ok(missingOutput.stderr.includes('requires a file path'));

    const missingCommand = run([]);
    strictEqual(missingCommand.status, 2);
    ok(missingCommand.stderr.includes('missing command'));
  });

  test('unreadable file exits 1', () => {
    const result = run(['lex', join(root, 'test', 'data', 'modules', 'does-not-exist.asn1')]);
    strictEqual(result.status, 1);
    ok(result.stderr.length > 0);
  });
});
