/**
 * Packrat memoization: backtracking must not change parse/grok results, and
 * combinator work at a (parser, index) should be reused.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, test } from 'node:test';
import {
  deepStrictEqual,
  strict as assert,
  strictEqual as assertEqual,
} from 'node:assert';
import {
  AssignmentType,
  grok,
  lex,
  LogLevel,
  parse,
  TypeType,
  ValueType,
} from '../dist/index.mjs';
import Parser from '../dist/lib/Parser.mjs';
import { default as logger } from '../dist/lib/loggers/console.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

logger.level = LogLevel.error;

function parseText(text) {
  return parse(text, Array.from(lex(text)));
}

function countCstNodes(node) {
  let n = 1;
  for (const child of node.children) {
    n += countCstNodes(child);
  }
  return n;
}

describe('Packrat memoization', () => {
  test('does not retain the memo table on the parse result', () => {
    const text = 'M {iso} DEFINITIONS ::= BEGIN T ::= INTEGER END';
    const p = parseText(text);
    assertEqual(p.error, undefined);
    assertEqual(p.memo, undefined);
  });

  test('still groks INTEGER DEFAULT values using currentType', () => {
    const text = `
M {iso} DEFINITIONS ::= BEGIN
  S ::= SEQUENCE {
    flag BOOLEAN DEFAULT TRUE,
    n INTEGER DEFAULT 5
  }
END`;
    const modules = grok(text);
    assertEqual(modules.length, 1);
    const s = modules[0].assignments.S;
    assertEqual(s.assignmentType, AssignmentType.TypeAssignment);
    assertEqual(s.type.typeType, TypeType.SequenceType);
    const comps = s.type.type.rootComponentTypeList1;
    assertEqual(comps.length, 2);
    assertEqual(comps[0].default.valueType, ValueType.BooleanValue);
    assertEqual(comps[1].default.valueType, ValueType.IntegerValue);
    assertEqual(comps[1].default.value, 5);
  });

  test('still groks TIME SETTINGS and ObjectClassFieldType after backtracking', () => {
    const settings = readFileSync(
      join(__dirname, 'data/modules/_settings.asn1'),
      'utf8'
    );
    const settingsModules = grok(settings);
    assertEqual(settingsModules[0].name, 'A');
    assertEqual(
      settingsModules[0].assignments['Date-Time'].type.typeType,
      TypeType.TimeType
    );

    const problem = readFileSync(
      join(__dirname, 'data/modules/_problem.asn1'),
      'utf8'
    );
    const p = parseText(problem);
    assertEqual(p.error, undefined);
    const modules = grok(problem, p);
    assertEqual(modules[0].name, 'OSIProtocolSpecification');
    const t = modules[0].assignments.OsiBindError.type;
    assertEqual(t.typeType, TypeType.SequenceType);
    const field = t.type.rootComponentTypeList1[0];
    assertEqual(field.namedType.identifier, 'single-ASN1-type');
    assertEqual(
      field.namedType.type.typeType,
      TypeType.ObjectClassFieldType
    );
  });

  test('clears identifier context between modules so later modules re-parse', () => {
    const text = `
A {iso} DEFINITIONS ::= BEGIN
  Foo ::= INTEGER
  v Foo ::= 1
END
B {iso} DEFINITIONS ::= BEGIN
  Foo ::= BOOLEAN
  v Foo ::= TRUE
END`;
    const modules = grok(text);
    assertEqual(modules.length, 2);
    assertEqual(modules[0].assignments.Foo.type.typeType, TypeType.IntegerType);
    assertEqual(modules[0].assignments.v.value.valueType, ValueType.IntegerValue);
    assertEqual(modules[1].assignments.Foo.type.typeType, TypeType.BooleanType);
    assertEqual(modules[1].assignments.v.value.valueType, ValueType.BooleanValue);
  });

  test('produces a stable CST across two parses of the same module', () => {
    const text = readFileSync(
      join(__dirname, 'data/modules/AuthenticationFramework.asn1'),
      'utf8'
    );
    const a = parseText(text);
    const b = parseText(text);
    assertEqual(a.error, undefined);
    assertEqual(b.error, undefined);
    deepStrictEqual(a.cst.toJSON(), b.cst.toJSON());
  });

  test('reuses combinator work so execute count stays well below the pre-memo baseline', () => {
    const orig = Parser.prototype.execute;
    let calls = 0;
    Parser.prototype.execute = function instrumentedExecute(state) {
      calls++;
      return orig.call(this, state);
    };
    try {
      const text = readFileSync(
        join(__dirname, 'data/modules/AuthenticationFramework.asn1'),
        'utf8'
      );
      const tokens = Array.from(lex(text));
      const p = parse(text, tokens);
      assertEqual(p.error, undefined);
      const callsPerToken = calls / tokens.length;
      // Pre-memo this file was ~62 execute() calls per token, ~215k total.
      assert(
        callsPerToken < 40,
        `expected < 40 execute() calls/token after packrat, got ${callsPerToken.toFixed(1)} (${calls} calls, ${tokens.length} tokens)`
      );
      assert(
        calls < 150000,
        `expected < 150000 execute() calls after packrat, got ${calls}`
      );
      assert(countCstNodes(p.cst) > 0);
    } finally {
      Parser.prototype.execute = orig;
    }
  });
});
