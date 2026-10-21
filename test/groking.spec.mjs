import { ASN1SemanticError, AssignmentType, LogLevel, grok, parse, FieldSpecType, ValueType } from '../dist/index.mjs';
import { default as logger } from '../dist/lib/loggers/console.mjs';
import { describe, test } from 'node:test';
import { strictEqual as assertEqual, strict as assert } from 'node:assert';

const cases = [
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field } END',
    FieldSpecType.TypeFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field OPTIONAL } END',
    FieldSpecType.TypeFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field DEFAULT INTEGER } END',
    FieldSpecType.TypeFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &field INTEGER } END',
    FieldSpecType.FixedTypeValueFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &field INTEGER UNIQUE } END',
    FieldSpecType.FixedTypeValueFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &field INTEGER OPTIONAL } END',
    FieldSpecType.FixedTypeValueFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &field INTEGER DEFAULT 5 } END',
    FieldSpecType.FixedTypeValueFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &field &Id } END',
    FieldSpecType.VariableTypeValueFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &field &obj.&Id } END',
    FieldSpecType.VariableTypeValueFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &field &Id OPTIONAL } END',
    FieldSpecType.VariableTypeValueFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &field &obj.&Id OPTIONAL } END',
    FieldSpecType.VariableTypeValueFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &field &Id DEFAULT 5 } END',
    FieldSpecType.VariableTypeValueFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &field &obj.&Id DEFAULT 5 } END',
    FieldSpecType.VariableTypeValueFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field INTEGER } END',
    FieldSpecType.FixedTypeValueSetFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field INTEGER OPTIONAL } END',
    FieldSpecType.FixedTypeValueSetFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field INTEGER DEFAULT { 5 } } END',
    FieldSpecType.FixedTypeValueSetFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field &Id } END',
    FieldSpecType.VariableTypeValueSetFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field &obj.&Id } END',
    FieldSpecType.VariableTypeValueSetFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field &Id OPTIONAL } END',
    FieldSpecType.VariableTypeValueSetFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field &obj.&Id OPTIONAL } END',
    FieldSpecType.VariableTypeValueSetFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field &Id DEFAULT { 5 } } END',
    FieldSpecType.VariableTypeValueSetFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field &obj.&Id DEFAULT { 5 } } END',
    FieldSpecType.VariableTypeValueSetFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &field ATTRIBUTE } END',
    FieldSpecType.ObjectFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &field ATTRIBUTE OPTIONAL } END',
    FieldSpecType.ObjectFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &field ATTRIBUTE DEFAULT { &id 5 } } END',
    FieldSpecType.ObjectFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field ATTRIBUTE } END',
    FieldSpecType.ObjectSetFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field ATTRIBUTE OPTIONAL } END',
    FieldSpecType.ObjectSetFieldSpec,
  ],
  [
    'A {iso} DEFINITIONS ::= BEGIN CLS ::= CLASS { &Field ATTRIBUTE DEFAULT { cn } } END',
    FieldSpecType.ObjectSetFieldSpec,
  ],
];

describe('Groking', () => {
  logger.level = LogLevel.error;

  test('correctly identifies all field spec types in an object class definition', () => {
    for (const [teststr, fst] of cases) {
      const g = grok(teststr);
      // We use Object.values()[0] here, because the field name has to vary in capitalization.
      const spectype = Object.values((g[0].assignments.CLS).objectClass.fieldSpecs)[0].specType;
      assertEqual(spectype, fst);
    }
  });

  test('can detect duplicate assigned identifiers', () => {
    const text =
      'A {iso(1)} DEFINITIONS ::= BEGIN Typeyboi ::= ANY Typeyboi ::= ANY END';
    const modules = grok(text);
    assertEqual(modules.length, 1);
    assertEqual(modules[0].duplicateAssignments.length, 1);
  });

  test('can detect duplicate parameters', () => {
    const text = `A {iso(1)} DEFINITIONS ::= BEGIN
            Typeyboi {A,B,A} ::= INTEGER
        END`;
    assert.throws(() => {
      grok(text);
    });
  });

  test('associates productions with every assignment', () => {
    const text =
      'A {iso(1)} DEFINITIONS ::= BEGIN Typeyboi1 ::= ANY value1 BOOLEAN ::= TRUE END';
    const g = grok(text);
    for (const assignment of Object.values(g[0].assignments)) {
      assert(assignment.production);
    }
  });

  test('rejects a single-arc object identifier whose name is not a recognized root arc', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
asdf OBJECT IDENTIFIER ::= { pkiAttributeType (2) }
END`;
    assert.throws(
      () => grok(text),
      (error) =>
        error instanceof ASN1SemanticError &&
        error.message.includes("'pkiAttributeType' (2)") &&
        error.message.includes("'joint-iso-itu-t' and 'joint-iso-ccitt'") &&
        error.message.includes('{ pkiAttributeType 2 }') &&
        error.production !== undefined,
    );
  });

  test('rejects a root arc name that does not match its number', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
asdf OBJECT IDENTIFIER ::= { joint-iso-itu-t(1) 5 }
END`;
    assert.throws(
      () => grok(text),
      (error) =>
        error instanceof ASN1SemanticError &&
        error.message.includes("'joint-iso-itu-t' (1)") &&
        error.message.includes("'iso'"),
    );
  });

  test('rejects an unrecognized name on the first arc of a longer object identifier', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
asdf OBJECT IDENTIFIER ::= { goofyboi(1) 5 }
END`;
    assert.throws(
      () => grok(text),
      (error) =>
        error instanceof ASN1SemanticError &&
        error.message.includes("'goofyboi' (1)"),
    );
  });

  test('accepts a single root arc that uses a recognized name or number', () => {
    const values = [
      '{ joint-iso-itu-t }',
      '{ joint-iso-ccitt }',
      '{ joint-iso-itu-t(2) }',
      '{ joint-iso-ccitt(2) }',
      '{ iso(1) }',
      '{ itu-t(0) }',
      '{ ccitt(0) }',
      '{ 0 }',
      '{ 1 }',
      '{ 2 }',
    ];
    for (const value of values) {
      const text = `A {iso} DEFINITIONS ::= BEGIN
asdf OBJECT IDENTIFIER ::= ${value}
END`;
      const modules = grok(text);
      const assignment = modules[0].assignments.asdf;
      assertEqual(assignment.assignmentType, AssignmentType.ValueAssignment);
      assertEqual(assignment.value.valueType, ValueType.ObjectIdentifierValue);
      assertEqual(assignment.value.value.prefix, undefined);
    }
  });

  test('still treats a non-root name followed by a bare number as an object identifier prefix', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
asdf OBJECT IDENTIFIER ::= { pkiAttributeType 2 }
END`;
    const modules = grok(text);
    const assignment = modules[0].assignments.asdf;
    assertEqual(assignment.assignmentType, AssignmentType.ValueAssignment);
    assertEqual(assignment.value.valueType, ValueType.ObjectIdentifierValue);
    assertEqual(assignment.value.value.prefix.reference, 'pkiAttributeType');
    assertEqual(assignment.value.value.components[0].number, 2);
  });

  test('still accepts a bare name as a single object identifier arc', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
id-pkix-ocsp OBJECT IDENTIFIER ::= {id-ad}
END`;
    const modules = grok(text);
    const assignment = modules[0].assignments['id-pkix-ocsp'];
    assertEqual(assignment.assignmentType, AssignmentType.ValueAssignment);
    assertEqual(assignment.value.valueType, ValueType.ObjectIdentifierValue);
    assertEqual(assignment.value.value.components[0].name, 'id-ad');
  });

  test('accepts a recognized root name on a longer object identifier', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
asdf OBJECT IDENTIFIER ::= { iso(1) member-body(2) us(840) }
END`;
    const modules = grok(text);
    const assignment = modules[0].assignments.asdf;
    assertEqual(assignment.value.valueType, ValueType.ObjectIdentifierValue);
    assertEqual(assignment.value.value.components[0].name, 'iso');
    assertEqual(assignment.value.value.components[0].number, 1);
    assertEqual(assignment.value.value.components[1].name, 'member-body');
  });

  test('groks an object set whose exclusion is a parenthesized union', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
      OPERATION ::= CLASS {
        &Errors ERROR OPTIONAL
      } WITH SYNTAX {
        [ERRORS &Errors]
      }
      Errors ERROR ::= { operation.&Errors EXCEPT (referral | in-DSAReferral) }
      chained{OPERATION:operation} OPERATION ::= {
        ERRORS {operation.&Errors EXCEPT (referral | in-DSAReferral)}
      }
      Universe ERROR ::= { ALL EXCEPT (referral | in-DSAReferral) }
      Single ERROR ::= { (referral) }
    END`;
    const modules = grok(text);
    const excluded = modules[0].assignments.Errors.objectSetSpec
      .rootElementSetSpec.unions[0].intersections[0];
    assertEqual(excluded.elements.referencedObjects.reference, 'operation');
    assertEqual(excluded.elements.fieldName[0], '&Errors');
    assert('unions' in excluded.exclusions);
    assertEqual(excluded.exclusions.unions.length, 2);
    assertEqual(
      excluded.exclusions.unions[0].intersections[0].elements.reference,
      'referral',
    );
    assertEqual(
      excluded.exclusions.unions[1].intersections[0].elements.reference,
      'in-DSAReferral',
    );

    const universe = modules[0].assignments.Universe.objectSetSpec
      .rootElementSetSpec;
    assert('allExcept' in universe);
    assert('unions' in universe.allExcept);
    assertEqual(universe.allExcept.unions.length, 2);
    assertEqual(
      universe.allExcept.unions[0].intersections[0].elements.reference,
      'referral',
    );

    const single = modules[0].assignments.Single.objectSetSpec
      .rootElementSetSpec.unions[0].intersections[0];
    assertEqual(single.elements.reference, 'referral');
    assertEqual(single.exclusions, undefined);
  });

  test('groks an empty object set assigned to an object class', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
DFR-Returnable OPERATION ::= {}
END`;
    const parsed = parse(text);
    assertEqual(Object.keys(parsed.syntaxErrors).length, 1);
    const modules = grok(text, parsed);
    const assignment = modules[0].assignments['DFR-Returnable'];
    assertEqual(assignment.assignmentType, AssignmentType.ObjectSetAssignment);
    assertEqual(assignment.definedObjectClass.reference, 'OPERATION');
    assertEqual(assignment.objectSetSpec.rootElementSetSpec, undefined);
    assertEqual(assignment.objectSetSpec.additionalElementSetSpec, undefined);
    assertEqual(assignment.objectSetSpec.explicitlyExtensible, false);
  });

});
