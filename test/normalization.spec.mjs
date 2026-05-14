import { lex, LogLevel, grok, ProductionType, normalize, parse, correct, AssignmentType, TypeType } from '../dist/index.mjs';
import { default as logger } from '../dist/lib/loggers/console.mjs';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, test } from 'node:test';
import { strict as assert, strictEqual as assertEqual } from 'node:assert';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('Normalization', () => {
  logger.level = LogLevel.error;

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
  correct(AuthenticationFramework_asn1_modules);
  normalize(AuthenticationFramework_asn1_modules);

  test('adds a module to every assignment', () => {
    AuthenticationFramework_asn1_modules.forEach((module) => {
      Object.values(module.assignments).forEach((assignment) => {
        assertEqual(assignment.module.name, 'AuthenticationFramework');
      });
    });
  });

  test('does not distinguish between parameterized and non-parameterized types', () => {
    AuthenticationFramework_asn1_modules.forEach((module) => {
      Object.values(module.assignments).forEach((assignment) => {
        assertEqual(assignment.assignmentType.indexOf('Parameterized'), -1);
      });
    });
  });

  test('resolves confusion between ValueAssignment and ObjectAssignment', () => {
    const confusing_text = fs.readFileSync(
      path.join(
        __dirname,
        'data',
        'modules',
        '_value_object_confusion.asn1'
      ),
      { encoding: 'utf8' }
    );
    const parseResults = parse(confusing_text, Array.from(lex(confusing_text)));
    assertEqual(parseResults.error, undefined);
    const modules = grok(confusing_text, parseResults);
    correct(modules);
    normalize(modules);
    assertEqual(
      modules[0].assignments.aliasValue.assignmentType,
      AssignmentType.ValueAssignment,
    );
    assertEqual(
      modules[0].assignments.aliasObject.assignmentType,
      AssignmentType.ObjectAssignment,
    );
  });

  test('correctly orders dependencies', () => {
    assert(
      AuthenticationFramework_asn1_modules[0].assignments.Certificate
        .dependencies['AuthenticationFramework.SIGNED']
    );
    const cert = AuthenticationFramework_asn1_modules[0].assignments.Certificate.dependencyIndex;
    const signed = AuthenticationFramework_asn1_modules[0].assignments.SIGNED.dependencyIndex;
    assert(cert > signed);
  });

  test('Correctly identifies which symbols are parameters and dependencies', () => {
    const text = `A {iso} DEFINITIONS ::= BEGIN
            SIGNED{ToBeSigned} ::= SEQUENCE {
                toBeSigned    ToBeSigned,
                COMPONENTS OF SIGNATURE,
                ... }
            END`;
    const g = grok(text);
    correct(g);
    normalize(g);

    assert(g[0].assignments.SIGNED.dependencies);

    // Parameters
    assert(g[0].assignments.SIGNED.parameters);
    assertEqual(g[0].assignments.SIGNED.parameters.length, 1);
    assertEqual(
      g[0].assignments.SIGNED.parameters[0].dummyReference,
      'ToBeSigned',
    );
    assertEqual(
      g[0].assignments.SIGNED.parameters[0].assignmentType,
      AssignmentType.TypeAssignment,
    );

    // Actual Parameters
    assertEqual(
      (g[0].assignments.SIGNED).type.typeType,
      TypeType.SequenceType,
    );
    const ActualToBeSigned = (g[0].assignments.SIGNED).type.type
      .rootComponentTypeList1[0].namedType.type;
    assertEqual(ActualToBeSigned.typeType, TypeType.DefinedType);
    assertEqual(ActualToBeSigned.type.reference, 'ToBeSigned');
    assertEqual(ActualToBeSigned.type.module, undefined);
    assertEqual(
      ActualToBeSigned.type.assignmentType,
      AssignmentType.TypeAssignment
    );
    assertEqual(ActualToBeSigned.type.parameterIndex, 0);

    // Dependencies
    assertEqual(Object.keys(g[0].assignments.SIGNED.dependencies).length, 1);
    assert(g[0].assignments.SIGNED.dependencies['A.SIGNATURE']);
    assertEqual(
      g[0].assignments.SIGNED.dependencies['A.SIGNATURE'].reference,
      'SIGNATURE',
    );
    assertEqual(g[0].assignments.SIGNED.dependencies['A.SIGNATURE'].module, undefined);
    assertEqual(
      g[0].assignments.SIGNED.dependencies['A.SIGNATURE'].assignmentType,
      AssignmentType.TypeAssignment,
    );
    assertEqual(
      g[0].assignments.SIGNED.dependencies['A.SIGNATURE'].parameterIndex,
      undefined,
    );
  });

  test(
    'unconfuses TypeAssignment and ObjectClassAssignment where the ' +
      'TypeAssignment identifier is in all capital letters and the ' +
      'right-hand side is a DefinedType',
    () => {
      // Type names MAY be in all caps, but MAY include lowercase letters.
      // Object class names MAY NOT contain lowercase letters.
      const text = `A {iso} DEFINITIONS ::= BEGIN
                Typeyboi ::= Blypyboi
                TYPEYBOI2 ::= Typeyboi
                Typeyboi3 ::= TYPEYBOI2
                CLASSYBOI ::= BLAPPY-BOI
                END`;

      const g = grok(text);
      assertEqual(
        g[0].assignments.Typeyboi.assignmentType,
        AssignmentType.TypeAssignment,
      );
      assertEqual(
        g[0].assignments.TYPEYBOI2.assignmentType,
        AssignmentType.TypeAssignment,
      );
      assertEqual(
        g[0].assignments.Typeyboi3.assignmentType,
        AssignmentType.TypeAssignment,
      );
      assertEqual(
        g[0].assignments.CLASSYBOI.assignmentType,
        AssignmentType.ObjectClassAssignment,
      );
    }
  );

  test('imports defined types used in replicated COMPONENTS OF components', () => {
    const InformationFramework_asn1 = fs.readFileSync(
      path.join(
        __dirname,
        'data',
        'modules',
        'InformationFramework.asn1'
      ),
      { encoding: 'utf8' }
    );
    const ServiceAdministration_asn1 = fs.readFileSync(
      path.join(
        __dirname,
        'data',
        'modules',
        'ServiceAdministration.asn1'
      ),
      { encoding: 'utf8' }
    );
    const if_modules = grok(InformationFramework_asn1);
    const sa_modules = grok(ServiceAdministration_asn1);
    const modules = [...if_modules, ...sa_modules];
    correct(modules);
    normalize(modules);
    const rctl1 = (if_modules[0].assignments.SearchRuleDescription).type
      .type.rootComponentTypeList1;
    assert(rctl1.length > 3);
    assertEqual(rctl1[0].componentsOf, undefined);
    assertEqual(
      if_modules[0].imports.ServiceAdministration.symbolList.ControlOptions,
      null,
    );
  });
});
