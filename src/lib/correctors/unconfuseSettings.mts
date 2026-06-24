import { type DefaultSyntax } from '../constructs/AssignmentTypes/ObjectAssignment/ObjectDefn/DefaultSyntax.mjs';
import type Module from '../constructs/Module.mjs';
import type ObjectAssignment from '../constructs/AssignmentTypes/ObjectAssignment.mjs';
import recursivelyResolve from '../recursivelyResolve.mjs';
import AssignmentType from '../constructs/AssignmentType.mjs';
import translateDefinedSyntaxToDefaultSyntax from '../normalizers/translateDefinedSyntaxToDefaultSyntax.mjs';
import type ObjectClassAssignment from '../constructs/AssignmentTypes/ObjectClassAssignment.mjs';
import { type SomethingFromObject } from '../constructs/SomethingFromObject.mjs';
import FieldSpecType from '../constructs/FieldSpecType.mjs';
import TypeType from '../constructs/TypeType.mjs';
import ValueType from '../constructs/ValueType.mjs';
import lex from '../lex.mjs';
import objectSetParser from '../parsers/specific/ObjectSet.mjs';
import valueSetParser from '../parsers/specific/ValueSet.mjs';
import oidValueParser from '../parsers/specific/ObjectIdentifierValue.mjs';
import objectSetGroker from '../grokers/ObjectSet.mjs';
import valueSetGroker from '../grokers/ValueSet.mjs';
import oidValueGroker from '../grokers/Values/ObjectIdentifierValue.mjs';
import type GrokContext from '../interfaces/GrokContext.mjs';
import consoleLogger from '../loggers/console.mjs';
import type {
  TypeSetting,
  ValueSetting,
  ObjectSetting,
  ValueSetSetting,
  ObjectSetSetting,
  Setting,
} from '../constructs/AssignmentTypes/ObjectAssignment/Setting.mjs';
import { LexicalProductionType } from "../ProductionType.mjs";
import ASN1ParserExpectationError from '../errors/ASN1ParserExpectationError.mjs';
import ASN1SemanticError from '../errors/ASN1SemanticError.mjs';

function deleteKeys(s: Partial<Setting>): void {
  if ('value' in s) {
    delete s.value;
  }
  if ('valueSet' in s) {
    delete s.valueSet;
  }
  if ('type' in s) {
    delete s.type;
  }
  if ('object' in s) {
    delete s.object;
  }
  if ('objectSet' in s) {
    delete s.objectSet;
  }
}

/**
 * @summary Unconfuse object settings
 * @description
 * Sometimes `Setting` productions can be parsed incorrectly. Since a
 * `DefinedType` and `DefinedValue` production have the same syntax, a
 * `DefinedType` could be parsed for a setting that is really a `DefinedValue`.
 * This function corrects that by referring to the object class assignment to
 * determine what alternative the `Setting` should have, and make corrections
 * where necessary.
 *
 * This does not unconfuse every setting conceivable, but it gets close enough.
 *
 * @param {DefaultSyntax} object The information object whose settings are to be
 *  unconfused
 * @param {ObjectClassAssignment} oca The object class assignment of which the
 *  information object is an instance.
 * @param {Module} currentModule The current module
 */
function unconfuseSettingsGivenObjectClassAssignment(
  object: DefaultSyntax,
  oca: ObjectClassAssignment,
  currentModule: Module
): void {
  if ('reference' in oca.objectClass) {
    // It was supposed to have been recursively resolved already.
    throw new ASN1ParserExpectationError(
      "Resolution expected already",
      oca.production,
      currentModule.name,
      oca.identifier, 
    );
  }
  const specs = oca.objectClass.fieldSpecs;
  Object.entries(object.fieldSettings).forEach(([name, setting]) => {
    const spec = specs[name];
    switch (spec.specType) {
      case FieldSpecType.TypeFieldSpec: {
        if ('value' in setting) {
          // We parsed the wrong thing.
          if (setting.value.valueType === ValueType.ValueFromObject) {
            const v = setting.value.value;
            const t: TypeSetting = {
              type: {
                text:
                  setting.text ??
                  v.text ??
                  `${v.referencedObjects}.${v.fieldName.join('.')}`,
                typeType: TypeType.TypeFromObject,
                type: {
                  ...v,
                },
              },
            };
            Object.assign(setting, t);
            delete (setting as {value?: any}).value;
          }
        }
        break;
      }
      case FieldSpecType.FixedTypeValueFieldSpec:
      case FieldSpecType.VariableTypeValueFieldSpec: {
        if ('type' in setting) {
          // We parsed the wrong thing.
          if (setting.type.typeType === TypeType.TypeFromObject) {
            const t = setting.type.type;
            const v: ValueSetting = {
              value: {
                text:
                  setting.text ??
                  t.text ??
                  `${t.referencedObjects}.${t.fieldName.join('.')}`,
                valueType: ValueType.ValueFromObject,
                value: {
                  ...setting.type.type,
                },
              },
            };
            Object.assign(setting, v);
            delete (setting as {type?: any}).type;
          }
        } else if (
            'value' in setting
            && spec.specType === FieldSpecType.FixedTypeValueFieldSpec
            && spec.type.typeType === TypeType.ObjectIdentifierType
            && setting.value.valueType === ValueType.BitStringValue
        ) {
            const lexemes = Array.from(lex(setting.text!)).filter((l) => l.type !== LexicalProductionType.comment);
            const parsing = oidValueParser.start(lexemes, setting.text!);
            const ctx: GrokContext = {
              log: consoleLogger,
              text: setting.text!,
              currentModule,
              enumItems: parsing.definedEnumItems,
            };
            const v: ValueSetting = {
                value: {
                    text: setting.text!,
                    valueType: ValueType.ObjectIdentifierValue,
                    productionType: parsing.cst.type,
                    production: parsing.cst,
                    value: oidValueGroker(parsing.cst, ctx),
                },
            };
            deleteKeys(setting);
            Object.assign(setting, v);
        }
        break;
      }
      case FieldSpecType.ObjectFieldSpec: {
        if ('value' in setting) {
          if (setting.value.valueType === ValueType.DefinedValue) {
            const o: ObjectSetting = {
              object: setting.value.value,
            };
            Object.assign(setting, o);
            delete (setting as {value?: any}).value;
          } else if (setting.value.valueType === ValueType.ValueFromObject) {
            const f: SomethingFromObject = { ...setting.value.value };
            const o: ObjectSetting = {
              object: f,
            };
            Object.assign(setting, o);
            delete (setting as {value?: any}).value;
          }
        }
        break;
      }
      case FieldSpecType.FixedTypeValueSetFieldSpec:
      case FieldSpecType.VariableTypeValueSetFieldSpec: {
        if (!('valueSet' in setting) && setting.text) {
          const lexemes = Array.from(lex(setting.text)).filter((l) => l.type !== LexicalProductionType.comment);
          const parsing = valueSetParser.start(lexemes, setting.text);
          const ctx: GrokContext = {
            log: consoleLogger,
            text: setting.text,
            currentModule,
            enumItems: parsing.definedEnumItems,
          };
          const vs: ValueSetSetting = {
            valueSet: valueSetGroker(parsing.cst, ctx),
          };
          deleteKeys(setting);
          Object.assign(setting, vs);
        }
        break;
      }
      case FieldSpecType.ObjectSetFieldSpec: {
        if (!('objectSet' in setting) && setting.text) {
          const lexemes = Array.from(lex(setting.text)).filter((l) => l.type !== LexicalProductionType.comment);
          const parsing = objectSetParser.start(lexemes, setting.text);
          const ctx: GrokContext = {
            log: consoleLogger,
            text: setting.text,
            currentModule,
            enumItems: parsing.definedEnumItems,
          };
          const os: ObjectSetSetting = {
            objectSet: objectSetGroker(parsing.cst, ctx),
          };
          deleteKeys(setting);
          Object.assign(setting, os);
        }
        break;
      }
      default: {
        break;
      }
    }
  });
}

/**
 * @summary Unconfuse object settings
 * @description
 * Sometimes `Setting` productions can be parsed incorrectly. Since a
 * `DefinedType` and `DefinedValue` production have the same syntax, a
 * `DefinedType` could be parsed for a setting that is really a `DefinedValue`.
 * This function corrects that by referring to the object class assignment to
 * determine what alternative the `Setting` should have, and make corrections
 * where necessary.
 *
 * This does not unconfuse every setting conceivable, but it gets close enough.
 *
 * @param {ObjectAssignment} oa The object assignment whose object is to be
 *  unconfused.
 * @param {Module} currentModule The current module
 * @param {Module[]} modulesInScope All modules in scope
 * @function
 */
export default function unconfuseSettings(
  oa: ObjectAssignment,
  currentModule: Module,
  modulesInScope: Module[]
): void {
  const oca = recursivelyResolve(
    oa.definedObjectClass,
    currentModule,
    modulesInScope
  );
  if (!oca) {
    return;
  }
  if (oca.assignmentType !== AssignmentType.ObjectClassAssignment) {
    throw new ASN1SemanticError(
      "Defined object class did not refer to an object class assignment",
      oa.production,
      currentModule.name,
      oa.identifier,
    );
  }
  if ('reference' in oca.objectClass) {
    throw new ASN1SemanticError(
      "Defined object class was not fully resolved",
      oa.production,
      currentModule.name,
      oa.identifier,
    );
  }
  const obj = oa.object;
  if ('reference' in obj || 'referencedObjects' in obj) {
    return;
  }

  const defaultSyntax: DefaultSyntax =
    'fieldSettings' in obj
      ? obj
      : (() => {
          const [defaultSyntax] = translateDefinedSyntaxToDefaultSyntax(
            obj,
            oca.objectClass.syntax ?? [],
            currentModule
          );
          if (!defaultSyntax) {
            throw new ASN1SemanticError(
              `Incorrect syntax for object of class ${oca.identifier} in module ${currentModule.name}.`,
              obj.production ?? oa.production,
              currentModule.name,
              oa.identifier,
            );
          }
          return defaultSyntax;
        })();

  unconfuseSettingsGivenObjectClassAssignment(
    defaultSyntax,
    oca,
    currentModule
  );
}
