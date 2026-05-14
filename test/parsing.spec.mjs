import { lex, LogLevel, parse, ProductionType } from '../dist/index.mjs';
import find from '../dist/lib/find.mjs';
import { default as logger } from '../dist/lib/loggers/console.mjs';
import { describe, test } from 'node:test';
import { strict as assert, strictEqual as assertEqual } from 'node:assert';

describe('Parsing', () => {
  logger.level = LogLevel.error;
  test.todo('Ensure that certain production types always have children.');

  // This is tested rigorously, because ObjectClassFieldType has been a source of a lot of parsing bugs.
  test('does not throw on an ObjectClassFieldType', () => {
    const testcases = [
      /**
       * This first one is especially important: by having the type identified
       * with a single character, it may be mistaken for an
       * ObjectClassAssignment, in which case, the parser reads the subsequent
       * objectclassidentifier, then quits parsing the Assignment. Prior to
       * fixing this issue, the parser would error out, expecting another new
       * assignment, but receiving "&.id" and therefore emitting and error.
       * To see where this is fixed, search for this UUID:
       * 06e527f8-874e-4374-a027-a4264b77a619
       */
      ['A {iso} DEFINITIONS ::= BEGIN T ::= CLS.&id END'],
      ['A {iso} DEFINITIONS ::= BEGIN Typey ::= CLS.&id END'],
      ['A {iso} DEFINITIONS ::= BEGIN Typey ::= CLS.&Type({Policies}) END'],
      [
        'A {iso} DEFINITIONS ::= BEGIN Typey ::= CLS.&Type({SupportedAlgorithms}{@algorithm}) END',
      ],
      ['A {iso} DEFINITIONS ::= BEGIN Typey ::= CLS.&id(matchingRule) END'],
      ['A {iso} DEFINITIONS ::= BEGIN Typey ::= CLS.&d.&AssertionType END'],
      [
        'A {iso} DEFINITIONS ::= BEGIN Typey ::= CLS.&d.&AssertionType({Policies}) END',
      ],
      [
        'A {iso} DEFINITIONS ::= BEGIN Typey ::= CLS.&d.&AssertionType({SupportedAlgorithms}{@algorithm}) END',
      ],
      [
        'A {iso} DEFINITIONS ::= BEGIN Typey ::= CLS.&d.&AssertionType(matchingRule) END',
      ],
    ];
    for (const [text] of testcases) {
      const p = parse(text, Array.from(lex(text)));
      assertEqual(p.error, undefined);
    }
  });

  test(
    'does not throw on a FixedTypeValueFieldSpec having Type ObjectClassFieldType',
    () => {
      const testcases = [
        ['A {iso} DEFINITIONS ::= BEGIN C ::= CLASS { &a CLS.&id } END'],
        ['A {iso} DEFINITIONS ::= BEGIN CLASSY ::= CLASS { &a CLS.&id } END'],
        [
          'A {iso} DEFINITIONS ::= BEGIN CLASSY ::= CLASS { &a CLS.&Type({Pols}) } END',
        ],
        [
          'A {iso} DEFINITIONS ::= BEGIN CLASSY ::= CLASS { &a CLS.&Type({SupAlgs}{@algorithm}) } END',
        ],
        [
          'A {iso} DEFINITIONS ::= BEGIN CLASSY ::= CLASS { &a CLS.&id(matchingRule) } END',
        ],
        [
          'A {iso} DEFINITIONS ::= BEGIN CLASSY ::= CLASS { &a CLS.&d.&AssertionType } END',
        ],
        [
          'A {iso} DEFINITIONS ::= BEGIN CLASSY ::= CLASS { &a CLS.&d.&AssertionType({Policies}) } END',
        ],
        [
          'A {iso} DEFINITIONS ::= BEGIN CLASSY ::= CLASS { &a CLS.&d.&AssertionType({SupAlgs}{@algorithm}) } END',
        ],
        [
          'A {iso} DEFINITIONS ::= BEGIN CLASSY ::= CLASS { &a CLS.&d.&AssertionType(matchingRule) } END',
        ],
      ];
      for (const [text] of testcases) {
        const p = parse(text, Array.from(lex(text)));
        assertEqual(p.error, undefined);
      }
    }
  );

  test('parses the retracted AnyType production.', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
            Typeyboi ::= ANY
            Typeyboi ::= SEQUENCE {
                id INTEGER,
                type ANY DEFINED BY id,
                ...
            }
            END`;
    const p = parse(text, Array.from(lex(text)));
    assertEqual(p.error, undefined);
  });
});

describe('Parser error detection', () => {
  logger.level = LogLevel.error;

  function assertSyntaxErrorsFound(text) {
    const p = parse(text, Array.from(lex(text)));
    assertEqual(p.error, undefined);
    assertEqual(Object.keys(p.syntaxErrors).length, 1);
  }

  test('produces SYNTAX-ERROR productions where assert() parser is used', () => {
    const text = 'A {iso} DEFINITIONS EXPLICIT ::= BEGIN Typeyboi ::= ANY END';
    const p = parse(text, Array.from(lex(text)));
    assertEqual(p.error, undefined);
    const not_TAGS = p.cst.children[1].children[0].children[6].children[2];
    assertEqual(not_TAGS.type, ProductionType.SYNTAX_ERROR);
    assert(not_TAGS.location.startIndex < not_TAGS.location.endIndex);
    assertEqual(Object.keys(p.syntaxErrors).length, 1);
    const loc = (Object.values(p.syntaxErrors)[0]).production.location;
    assert(loc.startIndex < loc.endIndex);
    assertEqual(loc.lineNumber, 1);
    assert(loc.columnNumber, 'A {iso} DEFINITIONS EXPLICIT '.length);
  });

  test('detects a missing closure to DefinitiveNameAndNumberForm', () => {
    assertSyntaxErrorsFound(
      'A {iso(1} DEFINITIONS ::= BEGIN Typeyboi ::= ANY END'
    );
  });

  test('detects a missing closure to DefinitiveOID', () => {
    assertSyntaxErrorsFound(
      'A {iso(1) DEFINITIONS ::= BEGIN Typeyboi ::= ANY END'
    );
  });

  test('detects a missing INSTRUCTIONS in EncodingReferenceDefault', () => {
    assertSyntaxErrorsFound(
      'A {iso(1)} DEFINITIONS XER ::= BEGIN Typeyboi ::= ANY END'
    );
    assertSyntaxErrorsFound(
      'A {iso(1)} DEFINITIONS XER EXPLICIT TAGS ::= BEGIN Typeyboi ::= ANY END'
    );
    assertSyntaxErrorsFound(
      'A {iso(1)} DEFINITIONS XER EXTENSIBILITY IMPLIED ::= BEGIN Typeyboi ::= ANY END'
    );
  });

  test.todo('Add tests for all usages of the assert() parser.');

  test('parses ObjectFromObjects and ObjectSetFromObjects differently.', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
            Attrs ATTRIBUTE ::= {
                ...,
                ctx.&primaryKeyAttr -- This should be seen as an ObjectFromObject
                | ctx.&SupportedAttributes -- This should be seen as an ObjectSetFromObjects.
            }
        END`;
    const p = parse(text);
    const ObjectSetAssignment = find(ProductionType.ObjectSetAssignment, p.cst);
    const ObjectFromObject = find(ProductionType.ObjectFromObject, p.cst);
    const ObjectSetFromObjects = find(
      ProductionType.ObjectSetFromObjects,
      p.cst
    );
    assert(ObjectSetAssignment);
    assert(ObjectFromObject);
    assert(ObjectSetFromObjects);
  });
});
