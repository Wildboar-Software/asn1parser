import LogLevel from '../../lib/LogLevel.js';
import lex from '../../lib/lex.js';
import parse from '../../lib/parse.js';
import grok from '../../lib/grok';
import normalize from '../../lib/normalize';
import logger from '../../lib/loggers/console.js';

describe('Module', () => {
  logger.level = LogLevel.error;

  const default_tagged = 'A {iso} DEFINITIONS ::= BEGIN B ::= NULL END';
  const explicitly_tagged =
    'A {iso} DEFINITIONS EXPLICIT TAGS ::= BEGIN B ::= NULL END';
  const implicitly_tagged =
    'A { iso } DEFINITIONS IMPLICIT TAGS ::= BEGIN B ::= NULL END';
  const automatically_tagged =
    'A { iso } DEFINITIONS AUTOMATIC TAGS ::= BEGIN B ::= NULL END';

  test.each([
    [default_tagged, 'EXPLICIT'],
    [explicitly_tagged, 'EXPLICIT'],
    [implicitly_tagged, 'IMPLICIT'],
    [automatically_tagged, 'AUTOMATIC'],
  ])('determines the %s default tagging mode correctly', (asn1, tm) => {
    const parseResults = parse(asn1, Array.from(lex(asn1)));
    expect(parseResults.error).toBeUndefined();
    const modules = grok(asn1, parseResults);
    normalize(modules);
    expect(modules[0].taggingMode).toBe(tm);
  });
});
