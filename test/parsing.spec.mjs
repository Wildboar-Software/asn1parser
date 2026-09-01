import { AssignmentType, grok, lex, LogLevel, parse, ProductionType, TypeType, ValueType } from '../dist/index.mjs';
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

  /**
   * UserDefinedConstraintParameter must try Type (which includes
   * ParameterizedType) before DefinedObjectSet / DefinedObjectClass. Those
   * shorter productions otherwise consume a typereference and leave the
   * ActualParameterList unparsed, so CONSTRAINED BY fails looking for `}`.
   */
  test('parses a parameterized DefinedType inside CONSTRAINED BY', () => {
    function findAll(type, prod, acc = []) {
      if (prod.type === type) {
        acc.push(prod);
      }
      for (const child of prod.children) {
        findAll(type, child, acc);
      }
      return acc;
    }

    const testcases = [
      `A {iso} DEFINITIONS ::= BEGIN
T ::= INTEGER (CONSTRAINED BY { U {x} })
END`,
      `A {iso} DEFINITIONS ::= BEGIN
T ::= INTEGER (CONSTRAINED BY { U {X} })
END`,
      `A {iso} DEFINITIONS ::= BEGIN
T ::= INTEGER (CONSTRAINED BY { FOO-BAR {x} })
END`,
      `A {iso} DEFINITIONS ::= BEGIN
AChBillingChargingCharacteristics {PARAMETERS-BOUND : bound} ::= OCTET STRING (SIZE
	(bound.&minAChBillingChargingLength .. bound.&maxAChBillingChargingLength))
	(CONSTRAINED BY {-- shall be the result of the BER-encoded value of the type --
	CAMEL-AChBillingChargingCharacteristics {bound} })
END`,
    ];
    for (const text of testcases) {
      const p = parse(text, Array.from(lex(text)));
      assertEqual(p.error, undefined);
      assertEqual(Object.keys(p.syntaxErrors).length, 0);
      assert(
        findAll(ProductionType.UserDefinedConstraint, p.cst).some((udc) =>
          findAll(ProductionType.ParameterizedType, udc).length > 0
        ),
        `expected ParameterizedType inside UserDefinedConstraint in: ${text}`
      );
    }

    const modules = grok(`A {iso} DEFINITIONS ::= BEGIN
T ::= INTEGER (CONSTRAINED BY { U {x} })
END`);
    const t = modules[0].assignments.T;
    assert(t.assignmentType === AssignmentType.TypeAssignment);
    assertEqual(t.type.typeType, TypeType.IntegerType);
    assertEqual(t.type.constraints.length, 1);
    const spec = t.type.constraints[0].spec;
    assert('constrainedBy' in spec);
    assertEqual(spec.constrainedBy.length, 1);
    assertEqual(spec.constrainedBy[0].replace(/\s+/g, ' ').trim(), 'U {x}');

    const camelModules = grok(`A {iso} DEFINITIONS ::= BEGIN
AChBillingChargingCharacteristics {PARAMETERS-BOUND : bound} ::= OCTET STRING (SIZE
	(bound.&minAChBillingChargingLength .. bound.&maxAChBillingChargingLength))
	(CONSTRAINED BY {-- shall be the result of the BER-encoded value of the type --
	CAMEL-AChBillingChargingCharacteristics {bound} })
END`);
    const ach =
      camelModules[0].assignments.AChBillingChargingCharacteristics;
    assert(ach.assignmentType === AssignmentType.TypeAssignment);
    assertEqual(ach.type.typeType, TypeType.OctetStringType);
    assertEqual(ach.type.constraints.length, 2);
    const udcSpec = ach.type.constraints[1].spec;
    assert('constrainedBy' in udcSpec);
    assertEqual(udcSpec.constrainedBy.length, 1);
    assert(
      /CAMEL-AChBillingChargingCharacteristics\s*\{\s*bound\s*\}/.test(
        udcSpec.constrainedBy[0]
      )
    );
  });

  test('still parses CONSTRAINED BY parameters that are not parameterized types', () => {
    const testcases = [
      'A {iso} DEFINITIONS ::= BEGIN T ::= INTEGER (CONSTRAINED BY { U }) END',
      'A {iso} DEFINITIONS ::= BEGIN T ::= INTEGER (CONSTRAINED BY { INTEGER: 5 }) END',
      'A {iso} DEFINITIONS ::= BEGIN T ::= INTEGER (CONSTRAINED BY { TYPE-IDENTIFIER }) END',
      'A {iso} DEFINITIONS ::= BEGIN T ::= INTEGER (CONSTRAINED BY { -- comment only -- }) END',
    ];
    for (const text of testcases) {
      const p = parse(text, Array.from(lex(text)));
      assertEqual(p.error, undefined);
      assertEqual(Object.keys(p.syntaxErrors).length, 0, text);
    }

    const modules = grok(
      'A {iso} DEFINITIONS ::= BEGIN T ::= INTEGER (CONSTRAINED BY { INTEGER: 5 }) END'
    );
    const spec = modules[0].assignments.T.type.constraints[0].spec;
    assert('constrainedBy' in spec);
    assertEqual(spec.constrainedBy.length, 1);
    assertEqual(spec.constrainedBy[0].replace(/\s+/g, ' ').trim(), 'INTEGER: 5');
  });
});

describe('Parser error detection', () => {
  logger.level = LogLevel.error;

  function assertSyntaxErrorsFound(text) {
    const p = parse(text, Array.from(lex(text)));
    assertEqual(p.error, undefined);
    assertEqual(Object.keys(p.syntaxErrors).length, 1);
  }

  test('parses the rest of a module after an unrecognized character', () => {
    const text = 'A {iso} DEFINITIONS ::= BEGIN T ::= INTEGER\n%\nU ::= BOOLEAN END';
    const tokens = Array.from(lex(text));
    const junk = tokens.find((token) => token.type === ProductionType.SYNTAX_ERROR);
    assert(junk);
    assertEqual(text.slice(junk.location.startIndex, junk.location.endIndex), '%');
    const p = parse(text, tokens);
    assertEqual(p.error, undefined);
    assertEqual(Object.keys(p.syntaxErrors).length, 1);
    const modules = grok(text, p);
    assertEqual(Object.keys(modules[0].assignments).sort().join(','), 'T,U');
  });

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

  test('reports empty value set assignments with a descriptive syntax error', () => {
    const cases = [
      `A {iso} DEFINITIONS ::= BEGIN
MealPlanEntitlements OBJECT IDENTIFIER ::= { ... }
END`,
      `A {iso} DEFINITIONS ::= BEGIN
MealPlanEntitlements OBJECT IDENTIFIER ::= { }
END`,
      `A {iso} DEFINITIONS ::= BEGIN
MealPlanEntitlements OBJECT IDENTIFIER ::= {}
END`,
    ];
    for (const text of cases) {
      const p = parse(text, Array.from(lex(text)));
      assertEqual(p.error, undefined, text);
      const errors = Object.values(p.syntaxErrors);
      assertEqual(errors.length, 1, text);
      assert(
        errors[0].message.includes('Value sets cannot be empty'),
        errors[0].message
      );
      const loc = errors[0].production.location;
      const excerpt = text.slice(loc.startIndex, loc.endIndex).replace(/\s+/g, '');
      assert(excerpt === '{...}' || excerpt === '{}', excerpt);
      assert(find(ProductionType.ValueSetTypeAssignment, p.cst));
      assert(find(ProductionType.ValueSet, p.cst));
    }
  });

  test('continues parsing assignments after an empty value set', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
Foo ::= INTEGER
MealPlanEntitlements OBJECT IDENTIFIER ::= { ... }
Bar ::= INTEGER
END`;
    const p = parse(text, Array.from(lex(text)));
    assertEqual(p.error, undefined);
    assertEqual(Object.keys(p.syntaxErrors).length, 1);
    assert(
      Object.values(p.syntaxErrors)[0].message.includes(
        'Value sets cannot be empty'
      )
    );
    const assignments = [];
    function collect(prod) {
      if (prod.type === ProductionType.Assignment) {
        assignments.push(prod);
      }
      for (const child of prod.children) {
        collect(child);
      }
    }
    collect(p.cst);
    assertEqual(assignments.length, 3);
  });

  test('does not treat a legal empty object set as an empty value set', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
MY-CLASS ::= CLASS { &id INTEGER UNIQUE }
MySet MY-CLASS ::= { ... }
END`;
    const p = parse(text, Array.from(lex(text)));
    assertEqual(p.error, undefined);
    assertEqual(Object.keys(p.syntaxErrors).length, 0);
    assert(find(ProductionType.ObjectSetAssignment, p.cst));
    assertEqual(find(ProductionType.ValueSetTypeAssignment, p.cst), undefined);
  });

  test('still parses a non-empty value set with an extension marker', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
Positive INTEGER ::= { 1 | 2, ... }
END`;
    const p = parse(text, Array.from(lex(text)));
    assertEqual(p.error, undefined);
    assertEqual(Object.keys(p.syntaxErrors).length, 0);
    assert(find(ProductionType.ValueSetTypeAssignment, p.cst));
  });

  test('reports an empty DEFAULT value set on a class field', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
MY-CLASS ::= CLASS { &Set INTEGER DEFAULT { ... } }
END`;
    const p = parse(text, Array.from(lex(text)));
    assertEqual(p.error, undefined);
    const errors = Object.values(p.syntaxErrors);
    assertEqual(errors.length, 1);
    assert(errors[0].message.includes('Value sets cannot be empty'));
  });

  test('does not treat `{ ... }` in an ActualParameter as an empty value set', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
T {P} ::= INTEGER
U ::= T { { ... } }
END`;
    const p = parse(text, Array.from(lex(text)));
    assertEqual(p.error, undefined);
    assertEqual(Object.keys(p.syntaxErrors).length, 0, text);
  });

  test('reports an empty parameterized value set assignment', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
MealPlanEntitlements {Param} OBJECT IDENTIFIER ::= { ... }
END`;
    const p = parse(text, Array.from(lex(text)));
    assertEqual(p.error, undefined);
    const errors = Object.values(p.syntaxErrors);
    assertEqual(errors.length, 1);
    assert(errors[0].message.includes('Value sets cannot be empty'));
    assert(
      find(ProductionType.ParameterizedValueSetTypeAssignment, p.cst)
    );
  });


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

  test('discerns between DefinedValue and NameForm as a prefix in an O', () => {
    {
      const text = `A {iso} DEFINITIONS ::= BEGIN
        id-asdf OBJECT IDENTIFIER ::= { iso org(2) asdfcorp(8) }
      END`;
      const modules = grok(text);
      const mod = modules[0];
      const id_asdf = mod.assignments["id-asdf"];
      assert(id_asdf.assignmentType === AssignmentType.ValueAssignment);
      const value = id_asdf.value;
      assert(value.valueType === ValueType.ObjectIdentifierValue);
      const oid = value.value;
      assert(!oid.prefix);
    }
    {
      const text = `A {iso} DEFINITIONS ::= BEGIN
        id-asdf OBJECT IDENTIFIER ::= { youso org(2) asdfcorp(8) }
      END`;
      const modules = grok(text);
      const mod = modules[0];
      const id_asdf = mod.assignments["id-asdf"];
      assert(id_asdf.assignmentType === AssignmentType.ValueAssignment);
      const value = id_asdf.value;
      assert(value.valueType === ValueType.ObjectIdentifierValue);
      const oid = value.value;
      assert(oid.prefix.reference, "youso");
    }
  });
});
