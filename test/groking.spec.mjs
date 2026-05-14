import { LogLevel, grok, FieldSpecType } from '../dist/index.mjs';
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
    assert.throws(() => {
      grok(text);
    });
  });

  test('can detect duplicate parameters', () => {
    const text = `A {iso(1)} DEFINITIONS ::= BEGIN
            Typeyboi {A,B,A} ::= INTEGER
        END`;
    assert.throws(() => {
      grok(text);
    });
  });
});
