import { strict as assert, strictEqual as assertEquals } from 'node:assert';
import { lex, grok, normalize, parse, correct, AssignmentType, TypeType } from '../dist/index.mjs';
import { test } from 'node:test';

const AuthenticationFramework = `
AuthenticationFramework {joint-iso-itu-t ds(5) module(1) authenticationFramework(7) 8}
DEFINITIONS ::= BEGIN

-- EXPORTS All

IMPORTS

  ATTRIBUTE, DistinguishedName, MATCHING-RULE, Name, NAME-FORM, OBJECT-CLASS,
  RelativeDistinguishedName, SYNTAX-NAME, top
    FROM InformationFramework informationFramework ;

SIGNATURE ::= SEQUENCE {
  algorithmIdentifier  AlgorithmIdentifier{{SupportedAlgorithms}},
  signature            BIT STRING,
  ... }

SIGNED{ToBeSigned} ::= SEQUENCE {
  toBeSigned    ToBeSigned,
  COMPONENTS OF SIGNATURE,
  ... }
  
END`;

test('the README example works', () => {
  const text = AuthenticationFramework;
  const lexResults = Array.from(lex(text));
  const parseResults = parse(text, lexResults);
  const modules = grok(text, parseResults);
  const normalizedModules = normalize(modules);
  correct(normalizedModules);
  const afmod = normalizedModules[0];
  assertEquals(afmod.name, 'AuthenticationFramework');
  const sig = afmod.assignments.SIGNATURE;
  assert(sig.assignmentType === AssignmentType.TypeAssignment);
  assert(afmod.assignments.SIGNATURE.type.typeType === TypeType.SequenceType);
  /** @type {import('../dist/index.mjs').SetOrSequenceType} */
  const seq = afmod.assignments.SIGNATURE.type.type;
  assertEquals(seq.rootComponentTypeList1.length, 2);
  const [ comp1, comp2 ] = seq.rootComponentTypeList1 ?? [];

  assertEquals(comp1.namedType.identifier, 'algorithmIdentifier');
  assertEquals(comp1.namedType.type.typeType, TypeType.DefinedType);
  assertEquals(comp1.namedType.type.type.reference, 'AlgorithmIdentifier');
  assertEquals(comp1.optional, false);
  assertEquals(comp1.text, 'algorithmIdentifier  AlgorithmIdentifier{{SupportedAlgorithms}}');
  assertEquals(comp1.default, undefined);
  // The offset of the start of this component in characters into the original text.
  assertEquals(comp1.production.location.startIndex, 341);
  // The offset of the end of this component in characters into the original text.
  assertEquals(comp1.production.location.endIndex, 341 + 63);

  assertEquals(comp2.namedType.identifier, 'signature');
  assertEquals(comp2.namedType.type.typeType, TypeType.BitStringType);
  assertEquals(comp2.optional, false);
  assertEquals(comp2.text, 'signature            BIT STRING');
  assertEquals(comp2.default, undefined);
});