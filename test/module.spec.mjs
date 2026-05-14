import { lex, LogLevel, grok, ProductionType, normalize, parse } from '../dist/index.mjs';
import { default as logger } from '../dist/lib/loggers/console.mjs';
import { describe, test } from 'node:test';
import { strictEqual as assertEqual } from 'node:assert';

describe('Module', () => {
  logger.level = LogLevel.error;

  const default_tagged = 'A {iso} DEFINITIONS ::= BEGIN B ::= NULL END';
  const explicitly_tagged =
    'A {iso} DEFINITIONS EXPLICIT TAGS ::= BEGIN B ::= NULL END';
  const implicitly_tagged =
    'A { iso } DEFINITIONS IMPLICIT TAGS ::= BEGIN B ::= NULL END';
  const automatically_tagged =
    'A { iso } DEFINITIONS AUTOMATIC TAGS ::= BEGIN B ::= NULL END';

  test('determines the default tagging mode correctly', () => {
    const testcases = [
      [default_tagged, 'EXPLICIT'],
      [explicitly_tagged, 'EXPLICIT'],
      [implicitly_tagged, 'IMPLICIT'],
      [automatically_tagged, 'AUTOMATIC'],
    ];
    for (const [asn1, tm] of testcases) {
      const parseResults = parse(asn1, Array.from(lex(asn1)));
      assertEqual(parseResults.error, undefined);
        const modules = grok(asn1, parseResults);
        normalize(modules);
        assertEqual(modules[0].taggingMode, tm);
      }
    });
});
