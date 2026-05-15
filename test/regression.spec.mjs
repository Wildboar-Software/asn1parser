import { lex, LogLevel, grok, ProductionType, normalize, parse, correct, AssignmentType, TypeType } from '../dist/index.mjs';
import { default as logger } from '../dist/lib/loggers/console.mjs';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, test } from 'node:test';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { strict as assert, strictEqual as assertEqual } from 'node:assert';

describe('Parser', () => {
  logger.level = LogLevel.error;

  test('does not throw or return an error when there is a trailing whitespace', () => {
    const problem = 'A {iso} DEFINITIONS ::= BEGIN B ::= NULL END ';
    let lexResults;
    let parseResults;
    assert.doesNotThrow(() => {
      lexResults = Array.from(lex(problem));
      parseResults = parse(problem, lexResults);
    });
    assertEqual(parseResults.error, undefined);
    assert.ok(
      lexResults[lexResults.length - 1].type ===
        ProductionType.nonNewlineWhitespace
    );
  });

  test('does not throw or return an error when there is no trailing whitespace', () => {
    const problem = 'A {iso} DEFINITIONS ::= BEGIN B ::= NULL END';
    let lexResults;
    let parseResults;
    assert.doesNotThrow(() => {
      lexResults = Array.from(lex(problem));
      parseResults = parse(problem, lexResults);
    });
    assertEqual(parseResults.error, undefined);
    assert.ok(lexResults[lexResults.length - 1].type === ProductionType._END);
  });

  test('does not throw or return an error when there is a leading whitespace', () => {
    const problem = ' A {iso} DEFINITIONS ::= BEGIN B ::= NULL END';
    let lexResults;
    let parseResults;
    assert.doesNotThrow(() => {
      lexResults = Array.from(lex(problem));
      parseResults = parse(problem, lexResults);
    });
    assertEqual(parseResults.error, undefined);
    assert.ok(lexResults[0].type === ProductionType.nonNewlineWhitespace);
  });

  // Tag ::= "[" EncodingReference Class ClassNumber "]"
  // EncodingReference ::= encodingreference ":" | empty
  // ClassNumber ::= number | DefinedValue
  // Class ::= UNIVERSAL | APPLICATION | PRIVATE | empty
  const taggedTypeWithEncodingReferenceCases = [
    ['A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= [ BIGBOI: 8 ] Blypyboi END'],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= [ BIGBOI: Definedboi ] Blypyboi END',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= [ BIGBOI: UNIVERSAL 8 ] Blypyboi END',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= [ BIGBOI: UNIVERSAL Definedboi ] Blypyboi END',
    ],
  ];
  for (const [i, [text]] of taggedTypeWithEncodingReferenceCases.entries()) {
    test(`can parse a TaggedType with and EncodingReference (${i})`, () => {
      let lexResults;
      let parseResults;
      assert.doesNotThrow(() => {
        lexResults = Array.from(lex(text));
        parseResults = parse(text, lexResults);
      });
      assertEqual(parseResults.error, undefined);
    });
  }

  test('recognizes an objectclassreference as a DummyParameter', () => {
    // TODO: Check the assignment types once parameter normalization has been moved to groking.
    {
      const text = `A {iso} DEFINITIONS ::= BEGIN
                CLASSYBOI ::= CLASS {
                    &id OBJECT IDENTIFIER
                }
                Typeyboi {CLASSYBOI:obj} ::= INTEGER
            END`;

      const modules = grok(text);
      assertEqual(
        typeof modules[0].assignments.Typeyboi.parameters[0].paramGovernor,
        'string'
      );
      assertEqual(
        modules[0].assignments.Typeyboi.parameters[0].assignmentType,
        AssignmentType.ObjectAssignment
      );
    }

    {
      const text = `A {iso} DEFINITIONS ::= BEGIN
                Typeyboi {CLASSYBOI:obj} ::= INTEGER
            END`;

      const modules = grok(text);
      assertEqual(
        typeof modules[0].assignments.Typeyboi.parameters[0].paramGovernor,
        'string'
      );
      assertEqual(
        modules[0].assignments.Typeyboi.parameters[0].assignmentType,
        AssignmentType.ObjectAssignment
      );
    }

    {
      const text = `A {iso} DEFINITIONS ::= BEGIN
                ALL-CAPS-TYPE ::= INTEGER
                Typeyboi {ALL-CAPS-TYPE:val} ::= INTEGER
            END`;

      const modules = grok(text);
      assertEqual(
        typeof modules[0].assignments.Typeyboi.parameters[0].paramGovernor,
        'object'
      );
      assertEqual(
        modules[0].assignments.Typeyboi.parameters[0].assignmentType,
        AssignmentType.ValueAssignment
      );
    }
  });

  test('does not read a duplicated trailing Module', () => {
    const text = `A {iso(1)} DEFINITIONS ::= BEGIN
            Typeyboi {A,B,A} ::= INTEGER
        END`;
    const p = parse(text);
    assertEqual(p.cst.children[2], undefined);
  });
});

describe('Groker', () => {
  logger.level = LogLevel.error;

  const sequenceSetOfCases = [
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SEQUENCE OF big Chungus END',
      'big',
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SEQUENCE OF Chungus END',
      undefined,
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SEQUENCE SIZE (1) OF big Chungus END',
      'big',
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SEQUENCE SIZE (1) OF Chungus END',
      undefined,
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SEQUENCE SIZE (1..5) OF big Chungus END',
      'big',
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SEQUENCE SIZE (1..5) OF Chungus END',
      undefined,
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SEQUENCE SIZE (1..MAX) OF big Chungus END',
      'big',
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SEQUENCE SIZE (1..MAX) OF Chungus END',
      undefined,
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SEQUENCE SIZE (MIN..MAX) OF big Chungus END',
      'big',
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SEQUENCE SIZE (MIN..MAX) OF Chungus END',
      undefined,
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SET OF big Chungus END',
      'big',
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SET OF Chungus END',
      undefined,
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SET SIZE (1) OF big Chungus END',
      'big',
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SET SIZE (1) OF Chungus END',
      undefined,
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SET SIZE (1..5) OF big Chungus END',
      'big',
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SET SIZE (1..5) OF Chungus END',
      undefined,
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SET SIZE (1..MAX) OF big Chungus END',
      'big',
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SET SIZE (1..MAX) OF Chungus END',
      undefined,
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SET SIZE (MIN..MAX) OF big Chungus END',
      'big',
      'Chungus',
    ],
    [
      'A {iso} DEFINITIONS ::= BEGIN Typeyboi ::= SET SIZE (MIN..MAX) OF Chungus END',
      undefined,
      'Chungus',
    ],
  ];
  for (const [i, row] of sequenceSetOfCases.entries()) {
    const [text, expectedName, expectedReference] = row;
    test(`groks SEQUENCE OF / SET OF types correctly (${i})`, () => {
      let lexResults;
      let parseResults;
      let grokResults;
      assert.doesNotThrow(() => {
        lexResults = Array.from(lex(text));
        parseResults = parse(text, lexResults);
      });
      assertEqual(parseResults.error, undefined);
      assert.doesNotThrow(() => {
        grokResults = grok(text, parseResults);
      });
      assert.notStrictEqual(grokResults[0].assignments.Typeyboi, undefined);
      if (expectedName) {
        assertEqual(
          grokResults[0].assignments.Typeyboi.type.type.of.identifier,
          expectedName
        );
        assert.notStrictEqual(
          grokResults[0].assignments.Typeyboi.type.type.of.type,
          undefined
        );
        assertEqual(
          grokResults[0].assignments.Typeyboi.type.type.of.type.type.reference,
          expectedReference
        );
      } else {
        assert.notStrictEqual(
          grokResults[0].assignments.Typeyboi.type.type.of.type,
          undefined
        );
        assertEqual(
          grokResults[0].assignments.Typeyboi.type.type.of.type.reference,
          expectedReference
        );
      }
    });
  }

  // Commented out because of newer constraint groking.
  // test.each([
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE OF Chungus END", undefined ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (0) OF Chungus END", 0 ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (0..5) OF Chungus END", [ 0, 5 ] ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (0..MAX) OF Chungus END", [ 0, undefined ] ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (1) OF Chungus END", 1 ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (1..5) OF Chungus END", [ 1, 5 ] ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (1..MAX) OF Chungus END", [ 1, undefined ] ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (MIN..MAX) OF Chungus END", [ undefined, undefined ] ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (MIN..5) OF Chungus END", [ undefined, 5 ] ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE OF Chungus END", undefined ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (0) OF Chungus END", 0 ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (0..5) OF Chungus END", [ 0, 5 ] ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (0..MAX) OF Chungus END", [ 0, undefined ] ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (1) OF Chungus END", 1 ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (1..5) OF Chungus END", [ 1, 5 ] ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (1..MAX) OF Chungus END", [ 1, undefined ] ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (MIN..MAX) OF Chungus END", [ undefined, undefined ] ],
  //     [ "A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE SIZE (MIN..5) OF Chungus END", [ undefined, 5 ] ],
  // ])("groks size constraints from SEQUENCE OF / SET OF types correctly", (text, expectedSize) => {
  //     let lexResults;
  //     let parseResults;
  //     let grokResults;
  //     expect(() => {
  //         lexResults = Array.from(lex(text));
  //         parseResults = parse(lexResults);
  //     }).not.toThrow();
  //     expect(parseResults.error).toBeUndefined();
  //     expect(() => {
  //         grokResults = grok(parseResults, text);
  //     }).not.toThrow();
  //     expect(grokResults[0].assignments.Typey).toBeDefined();
  //     expect(grokResults[0].assignments.Typey.type.type.size).toStrictEqual(expectedSize);
  // });

  test('does not fail to parse a SEQUENCE {...}', () => {
    const text = 'A {iso} DEFINITIONS ::= BEGIN Typey ::= SEQUENCE {...} END';
    let lexResults;
    let parseResults;
    let grokResults;
    assert.doesNotThrow(() => {
      lexResults = Array.from(lex(text));
      parseResults = parse(text, lexResults);
    });
    assertEqual(parseResults.error, undefined);
    assert.doesNotThrow(() => {
      grokResults = grok(text, parseResults);
    });
    assert.notStrictEqual(grokResults[0].assignments.Typey, undefined);
    assertEqual(
      grokResults[0].assignments.Typey.type.typeType,
      TypeType.SequenceType
    );
  });

  test('parses a Module with an import that is missing an AssignedIdentifier', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
                IMPORTS Transfer-syntax-name FROM ISO8823-PRESENTATION;
                Typey ::= SEQUENCE {...}
            END`;
    let lexResults;
    let parseResults;
    let grokResults;
    assert.doesNotThrow(() => {
      lexResults = Array.from(lex(text));
      parseResults = parse(text, lexResults);
    });
    assertEqual(parseResults.error, undefined);
    assert.doesNotThrow(() => {
      grokResults = grok(text, parseResults);
    });
    assert.notStrictEqual(grokResults[0].assignments.Typey, undefined);
    assertEqual(
      grokResults[0].assignments.Typey.type.typeType,
      TypeType.SequenceType
    );
  });
});

describe('Normalizer', () => {
  logger.level = LogLevel.error;

  test('unnests SEQUENCE within a SEQUENCE OF', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
            CertificateListContent ::= SEQUENCE {
                revokedCertificates  SEQUENCE OF SEQUENCE {
                    serialNumber         CertificateSerialNumber,
                    revocationDate       Time,
                    crlEntryExtensions   Extensions OPTIONAL,
                    ...} OPTIONAL,
                ...,
                ...,
                crlExtensions   [0]  Extensions OPTIONAL }
            END`;
    const g = grok(text);
    correct(g);
    normalize(g);
    assert.notStrictEqual(g[0].assignments.CertificateListContent, undefined);
    assert.notStrictEqual(
      g[0].assignments['CertificateListContent-revokedCertificates-Item'],
      undefined
    );
  });

  test('unnests SET within a SEQUENCE OF', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
            CertificateListContent ::= SEQUENCE {
                revokedCertificates  SEQUENCE OF SET {
                    serialNumber         CertificateSerialNumber,
                    revocationDate       Time,
                    crlEntryExtensions   Extensions OPTIONAL,
                    ...} OPTIONAL,
                ...,
                ...,
                crlExtensions   [0]  Extensions OPTIONAL }
            END`;
    const g = grok(text);
    correct(g);
    normalize(g);
    assert.notStrictEqual(g[0].assignments.CertificateListContent, undefined);
    assert.notStrictEqual(
      g[0].assignments['CertificateListContent-revokedCertificates-Item'],
      undefined
    );
  });

  test('unnests SEQUENCE within a SET OF', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
            CertificateListContent ::= SEQUENCE {
                revokedCertificates  SET OF SEQUENCE {
                    serialNumber         CertificateSerialNumber,
                    revocationDate       Time,
                    crlEntryExtensions   Extensions OPTIONAL,
                    ...} OPTIONAL,
                ...,
                ...,
                crlExtensions   [0]  Extensions OPTIONAL }
            END`;
    const g = grok(text);
    correct(g);
    normalize(g);
    assert.notStrictEqual(g[0].assignments.CertificateListContent, undefined);
    assert.notStrictEqual(
      g[0].assignments['CertificateListContent-revokedCertificates-Item'],
      undefined
    );
  });

  test('unnests SET within a SET OF', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
            CertificateListContent ::= SEQUENCE {
                revokedCertificates  SET OF SET {
                    serialNumber         CertificateSerialNumber,
                    revocationDate       Time,
                    crlEntryExtensions   Extensions OPTIONAL,
                    ...} OPTIONAL,
                ...,
                ...,
                crlExtensions   [0]  Extensions OPTIONAL }
            END`;
    const g = grok(text);
    correct(g);
    normalize(g);
    assert.notStrictEqual(g[0].assignments.CertificateListContent, undefined);
    assert.notStrictEqual(
      g[0].assignments['CertificateListContent-revokedCertificates-Item'],
      undefined
    );
  });

  test('unnests a CHOICE within a size-constrained SET OF', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
            SpecificExclusions ::= SET SIZE (1..MAX) OF CHOICE {
                chopBefore  [0]  LocalName,
                chopAfter   [1]  LocalName }
            END`;
    const g = grok(text);
    correct(g);
    normalize(g);
    assert.notStrictEqual(g[0].assignments.SpecificExclusions, undefined);
    assert.notStrictEqual((g[0].assignments.SpecificExclusions).type, undefined);
    assert.notStrictEqual(
      (g[0].assignments.SpecificExclusions).type.type,
      undefined
    );
    assert.notStrictEqual(
      (g[0].assignments.SpecificExclusions).type.type.of,
      undefined
    );
    assertEqual(
      (g[0].assignments.SpecificExclusions).type.type.of.typeType,
      TypeType.DefinedType
    );
    assert.notStrictEqual(
      g[0].assignments['SpecificExclusions-Item'],
      undefined
    );
    assertEqual(
      (g[0].assignments['SpecificExclusions-Item']).type.typeType,
      TypeType.ChoiceType
    );
    assertEqual(
      (g[0].assignments['SpecificExclusions-Item']).type.type
        .rootAlternativeTypeList.length,
      2
    );
  });

  test('unnests a CHOICE within a size-constrained SEQUENCE OF', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
            SpecificExclusions ::= SEQUENCE SIZE (1..MAX) OF CHOICE {
                chopBefore  [0]  LocalName,
                chopAfter   [1]  LocalName }
            END`;
    const g = grok(text);
    correct(g);
    normalize(g);
    assert.notStrictEqual(g[0].assignments.SpecificExclusions, undefined);
    assert.notStrictEqual((g[0].assignments.SpecificExclusions).type, undefined);
    assert.notStrictEqual(
      (g[0].assignments.SpecificExclusions).type.type,
      undefined
    );
    assert.notStrictEqual(
      (g[0].assignments.SpecificExclusions).type.type.of,
      undefined
    );
    assertEqual(
      (g[0].assignments.SpecificExclusions).type.type.of.typeType,
      TypeType.DefinedType
    );
    assert.notStrictEqual(
      g[0].assignments['SpecificExclusions-Item'],
      undefined
    );
    assertEqual(
      (g[0].assignments['SpecificExclusions-Item']).type.typeType,
      TypeType.ChoiceType
    );
    assertEqual(
      (g[0].assignments['SpecificExclusions-Item']).type.type
        .rootAlternativeTypeList.length,
      2
    );
  });

  test('unnests a CHOICE within a Prefixed size-constrained SEQUENCE OF', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
            SpecificExclusions ::= [APPLICATION 0] SEQUENCE SIZE (1..MAX) OF CHOICE {
                chopBefore  [0]  LocalName,
                chopAfter   [1]  LocalName }
            END`;
    const g = grok(text);
    correct(g);
    normalize(g);
    assert.notStrictEqual(g[0].assignments.SpecificExclusions, undefined);
    assert.notStrictEqual((g[0].assignments.SpecificExclusions).type, undefined);
    assert.notStrictEqual(
      (g[0].assignments.SpecificExclusions).type.type,
      undefined
    );
    assert.notStrictEqual(
      (g[0].assignments.SpecificExclusions).type.type.type.of,
      undefined
    );
    assertEqual(
      (g[0].assignments.SpecificExclusions).type.type.type.of.typeType,
      TypeType.DefinedType
    );
    assert.notStrictEqual(
      g[0].assignments['SpecificExclusions-Item'],
      undefined
    );
    assertEqual(
      (g[0].assignments['SpecificExclusions-Item']).type.typeType,
      TypeType.ChoiceType
    );
    assertEqual(
      (g[0].assignments['SpecificExclusions-Item']).type.type
        .rootAlternativeTypeList.length,
      2
    );
  });

  test('unnests a Prefixed CHOICE within size-constrained SEQUENCE OF', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
            SpecificExclusions ::= SEQUENCE SIZE (1..MAX) OF [APPLICATION 0] CHOICE {
                chopBefore  [0]  LocalName,
                chopAfter   [1]  LocalName }
            END`;
    const g = grok(text);
    correct(g);
    normalize(g);
    assert.notStrictEqual(g[0].assignments.SpecificExclusions, undefined);
    assert.notStrictEqual((g[0].assignments.SpecificExclusions).type, undefined);
    assert.notStrictEqual(
      (g[0].assignments.SpecificExclusions).type.type,
      undefined
    );
    assert.notStrictEqual(
      (g[0].assignments.SpecificExclusions).type.type.of,
      undefined
    );
    assertEqual(
      (g[0].assignments.SpecificExclusions).type.type.of.typeType,
      TypeType.PrefixedType
    );
    assertEqual(
      (g[0].assignments.SpecificExclusions).type.type.of.type.typeType,
      TypeType.DefinedType
    );
    assert.notStrictEqual(
      g[0].assignments['SpecificExclusions-Item'],
      undefined
    );
    assertEqual(
      (g[0].assignments['SpecificExclusions-Item']).type.typeType,
      TypeType.ChoiceType
    );
    assertEqual(
      (g[0].assignments['SpecificExclusions-Item']).type.type
        .rootAlternativeTypeList.length,
      2
    );
  });

  test('does not confuse an ObjectIdentifierValue ValueAssignment for an ObjectAssignment', () => {
    const UsefulDefinitions_asn1 = fs.readFileSync(
      path.join(__dirname, 'data', 'modules', 'UsefulDefinitions.asn1'),
      { encoding: 'utf8' }
    );
    const UsefulDefinitions_asn1_parseResults = parse(
      UsefulDefinitions_asn1,
      Array.from(lex(UsefulDefinitions_asn1))
    );
    assertEqual(UsefulDefinitions_asn1_parseResults.error, undefined);
    const UsefulDefinitions_asn1_modules = grok(
      UsefulDefinitions_asn1,
      UsefulDefinitions_asn1_parseResults
    );
    correct(UsefulDefinitions_asn1_modules);
    normalize(UsefulDefinitions_asn1_modules);
    Object.values(UsefulDefinitions_asn1_modules[0].assignments).forEach(
      (assn) => {
        assert.notStrictEqual(
          assn.assignmentType,
          AssignmentType.ObjectAssignment
        );
      }
    );
  });

  /**
   * See comment 3F5B84A3-609A-4142-91D3-B3A2FB965F0B.
   *
   * When I created an optimized Type parser, constrained types would produce
   * a CST that contained a BuiltinType or ReferencedType on the same level
   * as the constraint. In other words, the ConstrainedType's children would
   * be:
   *
   * BuiltinType whitespace Constraints
   *
   * instead of
   *
   * Type whitespace Constraints
   *
   * This caused an error where the groked type would have an invalid
   * typeType, because the typeType would, at times be derived from the
   * ProductionType value the CST node had.
   */
  test('does not create a Type with an unrecognized typeType', () => {
    function checkTypeType(node, depth = 0) {
      if (depth > 100) {
        // To prevent infinite loops.
        return;
      }
      depth++;
      if (typeof node === 'object' && node) {
        if ('typeType' in node) {
          assert.ok(Object.keys(TypeType).includes(node.typeType));
        }
        Object.values(node).forEach((v) => checkTypeType(v, depth));
      }
    }

    const AuthenticationFramework_asn1 = fs.readFileSync(
      path.join(
        __dirname,
        'data',
        'modules',
        'AuthenticationFramework.asn1'
      ),
      { encoding: 'utf8' }
    );
    const AuthenticationFramework_asn1_parseResults = parse(
      AuthenticationFramework_asn1,
      Array.from(lex(AuthenticationFramework_asn1))
    );
    assertEqual(AuthenticationFramework_asn1_parseResults.error, undefined);
    const AuthenticationFramework_asn1_modules = grok(
      AuthenticationFramework_asn1,
      AuthenticationFramework_asn1_parseResults
    );
    checkTypeType(AuthenticationFramework_asn1_modules[0]);
  });

  test('replaces object literals in object sets with their defined equivalents', () => {
    const Module_asn1 = fs.readFileSync(
      path.join(
        __dirname,
        'data',
        'modules',
        '_object_set_containing_objectdefns.asn1'
      ),
      { encoding: 'utf8' }
    );
    const Module_parseResults = parse(
      Module_asn1,
      Array.from(lex(Module_asn1))
    );
    assertEqual(Module_parseResults.error, undefined);
    const asn1Modules = grok(Module_asn1, Module_parseResults);
    correct(asn1Modules);
    normalize(asn1Modules);
    const elementThatWasSupposedToBeReplaced = (
      asn1Modules[0].assignments.NamedSchemes
    ).objectSetSpec.rootElementSetSpec.unions[0].intersections[0].elements;
    assert(elementThatWasSupposedToBeReplaced.reference);
  });
});

describe('Normalization', () => {
  const text = `
A {iso} DEFINITIONS ::= BEGIN

id-hat-authorizing-users OBJECT IDENTIFIER ::= { 1 3 4 6 4 1 }

X413ATTRIBUTE ::= CLASS {
    &id               OBJECT IDENTIFIER UNIQUE,
    &Type             ,
    &equalityMatch    X413ATTRIBUTE OPTIONAL,
    &substringsMatch  X413ATTRIBUTE OPTIONAL,
    &orderingMatch    X413ATTRIBUTE OPTIONAL,
    &numeration       ENUMERATED {single-valued(0), multi-valued(1)},
    &OtherMatches     X413ATTRIBUTE OPTIONAL
}
WITH SYNTAX {
    WITH ATTRIBUTE-SYNTAX &Type,
    [EQUALITY MATCHING-RULE &equalityMatch,]
    [SUBSTRINGS MATCHING-RULE &substringsMatch,]
    [ORDERING MATCHING-RULE &orderingMatch,]
    [OTHER MATCHING-RULES &OtherMatches,]
    NUMERATION &numeration,
    ID &id
}

oRDescriptorElementsMatch X413ATTRIBUTE ::= {
    WITH ATTRIBUTE-SYNTAX   BOOLEAN,
    NUMERATION              multi-valued,
    ID                      id-hat-authorizing-users
}

authorizing-users X413ATTRIBUTE ::= {
    WITH ATTRIBUTE-SYNTAX   BOOLEAN,
    EQUALITY MATCHING-RULE  oRDescriptorMatch,
    OTHER MATCHING-RULES {oRDescriptorElementsMatch | oRDescriptorElementsMatch, ...},
    NUMERATION              multi-valued,
    ID                      id-hat-authorizing-users
}

END
    `;

  const g = grok(text);
  assert.doesNotThrow(() => correct(g));
  assert.doesNotThrow(() => normalize(g));
});
