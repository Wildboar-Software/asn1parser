import LogLevel from '../../lib/LogLevel.mjs';
import lex from '../../lib/lex.mjs';
import parse from '../../lib/parse.mjs';
import grok from '../../lib/grok';
import correct from '../../lib/correct';
import normalize from '../../lib/normalize';
import logger from '../../lib/loggers/console.mjs';
import AssignmentType from '../../lib/constructs/AssignmentType.mjs';
import TypeType from '../../lib/constructs/TypeType.mjs';
import * as fs from 'fs';
import * as path from 'path';

describe('Normalization', () => {
  logger.level = LogLevel.error;

  const AuthenticationFramework_asn1 = fs.readFileSync(
    path.join(
      __dirname,
      '..',
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
  expect(AuthenticationFramework_asn1_parseResults.error).toBeUndefined();
  const AuthenticationFramework_asn1_modules = grok(
    AuthenticationFramework_asn1,
    AuthenticationFramework_asn1_parseResults
  );
  correct(AuthenticationFramework_asn1_modules);
  normalize(AuthenticationFramework_asn1_modules);

  test('adds a module to every assignment', () => {
    AuthenticationFramework_asn1_modules.forEach((module) => {
      Object.values(module.assignments).forEach((assignment) => {
        expect(assignment.module.name).toBe('AuthenticationFramework');
      });
    });
  });

  test('does not distinguish between parameterized and non-parameterized types', () => {
    AuthenticationFramework_asn1_modules.forEach((module) => {
      Object.values(module.assignments).forEach((assignment) => {
        expect(assignment.assignmentType).toEqual(
          expect.not.stringContaining('Parameterized')
        );
      });
    });
  });

  test('resolves confusion between ValueAssignment and ObjectAssignment', () => {
    const confusing_text = fs.readFileSync(
      path.join(
        __dirname,
        '..',
        'data',
        'modules',
        '_value_object_confusion.asn1'
      ),
      { encoding: 'utf8' }
    );
    const parseResults = parse(confusing_text, Array.from(lex(confusing_text)));
    expect(parseResults.error).toBeUndefined();
    const modules = grok(confusing_text, parseResults);
    correct(modules);
    normalize(modules);
    expect(modules[0].assignments.aliasValue.assignmentType).toBe(
      AssignmentType.ValueAssignment
    );
    expect(modules[0].assignments.aliasObject.assignmentType).toBe(
      AssignmentType.ObjectAssignment
    );
  });

  test('correctly orders dependencies', () => {
    expect(
      AuthenticationFramework_asn1_modules[0].assignments.Certificate
        .dependencies
    ).toEqual(
      expect.objectContaining({
        'AuthenticationFramework.SIGNED': expect.any(Object),
      })
    );

    expect(
      AuthenticationFramework_asn1_modules[0].assignments.Certificate
        .dependencyIndex
    ).toBeGreaterThan(
      AuthenticationFramework_asn1_modules[0].assignments.SIGNED.dependencyIndex
    );
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

    expect(g[0].assignments.SIGNED.dependencies).toBeDefined();

    // Parameters
    expect(g[0].assignments.SIGNED.parameters).toBeDefined();
    expect(g[0].assignments.SIGNED.parameters.length).toBe(1);
    expect(g[0].assignments.SIGNED.parameters[0].dummyReference).toBe(
      'ToBeSigned'
    );
    expect(g[0].assignments.SIGNED.parameters[0].assignmentType).toBe(
      AssignmentType.TypeAssignment
    );

    // Actual Parameters
    expect((g[0].assignments.SIGNED as any).type.typeType).toBe(
      TypeType.SequenceType
    );
    const ActualToBeSigned = (g[0].assignments.SIGNED as any).type.type
      .rootComponentTypeList1[0].namedType.type;
    expect(ActualToBeSigned.typeType).toBe(TypeType.DefinedType);
    expect(ActualToBeSigned.type.reference).toBe('ToBeSigned');
    expect(ActualToBeSigned.type.module).toBeUndefined();
    expect(ActualToBeSigned.type.assignmentType).toBe(
      AssignmentType.TypeAssignment
    );
    expect(ActualToBeSigned.type.parameterIndex).toBe(0);

    // Dependencies
    expect(Object.keys(g[0].assignments.SIGNED.dependencies).length).toBe(1);
    expect(g[0].assignments.SIGNED.dependencies['A.SIGNATURE']).toBeDefined();
    expect(g[0].assignments.SIGNED.dependencies['A.SIGNATURE'].reference).toBe(
      'SIGNATURE'
    );
    expect(
      g[0].assignments.SIGNED.dependencies['A.SIGNATURE'].module
    ).toBeUndefined();
    expect(
      g[0].assignments.SIGNED.dependencies['A.SIGNATURE'].assignmentType
    ).toBe(AssignmentType.TypeAssignment);
    expect(
      g[0].assignments.SIGNED.dependencies['A.SIGNATURE'].parameterIndex
    ).toBeUndefined();
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
      expect(g[0].assignments.Typeyboi.assignmentType).toBe(
        AssignmentType.TypeAssignment
      );
      expect(g[0].assignments.TYPEYBOI2.assignmentType).toBe(
        AssignmentType.TypeAssignment
      );
      expect(g[0].assignments.Typeyboi3.assignmentType).toBe(
        AssignmentType.TypeAssignment
      );
      expect(g[0].assignments.CLASSYBOI.assignmentType).toBe(
        AssignmentType.ObjectClassAssignment
      );
    }
  );

  test('imports defined types used in replicated COMPONENTS OF components', () => {
    const InformationFramework_asn1 = fs.readFileSync(
      path.join(
        __dirname,
        '..',
        'data',
        'modules',
        'InformationFramework.asn1'
      ),
      { encoding: 'utf8' }
    );
    const ServiceAdministration_asn1 = fs.readFileSync(
      path.join(
        __dirname,
        '..',
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
    const rctl1 = (if_modules[0].assignments.SearchRuleDescription as any).type
      .type.rootComponentTypeList1;
    expect(rctl1.length).toBeGreaterThan(3);
    expect(rctl1[0].componentsOf).toBeUndefined();
    expect(
      if_modules[0].imports.ServiceAdministration.symbolList.ControlOptions
    ).toBeDefined();
  });
});
