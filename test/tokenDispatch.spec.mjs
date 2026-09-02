/**
 * Token-type dispatch: FIRST-set gating must not change parse/grok results.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, test } from 'node:test';
import { strict as assert, strictEqual as assertEqual } from 'node:assert';
import {
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

describe('Token-type dispatch', () => {
  test('still groks INTEGER and BOOLEAN DEFAULT values', () => {
    const text = `
M {iso} DEFINITIONS ::= BEGIN
  S ::= SEQUENCE {
    flag BOOLEAN DEFAULT TRUE,
    n INTEGER DEFAULT 5
  }
END`;
    const modules = grok(text);
    assertEqual(modules[0].assignments.S.type.typeType, TypeType.SequenceType);
    const comps = modules[0].assignments.S.type.type.rootComponentTypeList1;
    assertEqual(comps[0].default.valueType, ValueType.BooleanValue);
    assertEqual(comps[1].default.valueType, ValueType.IntegerValue);
    assertEqual(comps[1].default.value, 5);
  });

  test('still groks ENUMERATED DEFAULT identifiers via currentType', () => {
    const text = `
M {iso} DEFINITIONS ::= BEGIN
  S ::= SEQUENCE { color ENUMERATED { red, green, blue } DEFAULT green }
END`;
    const modules = grok(text);
    const comps = modules[0].assignments.S.type.type.rootComponentTypeList1;
    assertEqual(comps[0].default.valueType, ValueType.EnumeratedValue);
  });

  test('discerns SEQUENCE, SEQUENCE OF, and SEQUENCE SIZE OF', () => {
    const text = `
M {iso} DEFINITIONS ::= BEGIN
  Seq ::= SEQUENCE { n INTEGER }
  SeqOf ::= SEQUENCE OF INTEGER
  SeqSize ::= SEQUENCE SIZE (1..MAX) OF INTEGER
  SetOf ::= SET OF BOOLEAN
  SetSize ::= SET SIZE (1) OF BOOLEAN
END`;
    const modules = grok(text);
    const a = modules[0].assignments;
    assertEqual(a.Seq.type.typeType, TypeType.SequenceType);
    assertEqual(a.SeqOf.type.typeType, TypeType.SequenceOfType);
    assertEqual(a.SeqSize.type.typeType, TypeType.SequenceOfType);
    assertEqual(a.SetOf.type.typeType, TypeType.SetOfType);
    assertEqual(a.SetSize.type.typeType, TypeType.SetOfType);
  });

  test('still groks tagged types, useful types, and character strings', () => {
    const text = `
M {iso} DEFINITIONS ::= BEGIN
  Tagged ::= [0] INTEGER
  When ::= UTCTime
  Name ::= UTF8String
  Any ::= ANY
END`;
    const modules = grok(text);
    const a = modules[0].assignments;
    assertEqual(a.Tagged.type.typeType, TypeType.PrefixedType);
    assert(a.Tagged.type.tagging);
    assertEqual(a.Tagged.type.type.typeType, TypeType.IntegerType);
    assertEqual(a.When.type.typeType, TypeType.UTCTime);
    assertEqual(a.Name.type.typeType, TypeType.UTF8String);
    assertEqual(a.Any.type.typeType, TypeType.AnyType);
  });

  test('still groks ObjectClassFieldType and ChoiceValue', () => {
    const ocf = grok(
      readFileSync(join(__dirname, 'data/modules/_ObjectClassFieldType.asn1'), 'utf8')
    );
    assertEqual(ocf[0].assignments.Typeyboi.type.typeType, TypeType.ObjectClassFieldType);

    const text = `
M {iso} DEFINITIONS ::= BEGIN
  Auth ::= CHOICE {
    basicLevels SEQUENCE { signed BOOLEAN DEFAULT FALSE },
    other EXTERNAL
  }
  v Auth ::= basicLevels : { signed TRUE }
END`;
    const modules = grok(text);
    assertEqual(modules[0].assignments.v.value.valueType, ValueType.ChoiceValue);
  });

  test('still groks integer and OID values', () => {
    const text = `
M {iso} DEFINITIONS ::= BEGIN
  oid OBJECT IDENTIFIER ::= { 1 2 3 }
  n INTEGER ::= 9
END`;
    const modules = grok(text);
    assertEqual(modules[0].assignments.n.value.valueType, ValueType.IntegerValue);
    assertEqual(modules[0].assignments.n.value.value, 9);
    assertEqual(
      modules[0].assignments.oid.value.valueType,
      ValueType.ObjectIdentifierValue
    );
  });

  test('still parses AuthenticationFramework and _problem.asn1', () => {
    const auth = readFileSync(
      join(__dirname, 'data/modules/AuthenticationFramework.asn1'),
      'utf8'
    );
    const problem = readFileSync(
      join(__dirname, 'data/modules/_problem.asn1'),
      'utf8'
    );
    const authParse = parseText(auth);
    const problemParse = parseText(problem);
    assertEqual(authParse.error, undefined);
    assertEqual(problemParse.error, undefined);
    const authModules = grok(auth, authParse);
    const problemModules = grok(problem, problemParse);
    assertEqual(
      problemModules[0].assignments.OsiBindError.type.type.rootComponentTypeList1[0]
        .namedType.type.typeType,
      TypeType.ObjectClassFieldType
    );
    assert(Object.keys(authModules[0].assignments).length > 10);
  });

  test('cuts execute() work further below the packrat-only baseline', () => {
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
      assert(
        callsPerToken < 25,
        `expected < 25 execute() calls/token after token dispatch, got ${callsPerToken.toFixed(1)} (${calls} calls, ${tokens.length} tokens)`
      );
    } finally {
      Parser.prototype.execute = orig;
    }
  });
});
