import AssignmentType from '../constructs/AssignmentType.js';
import { type ActualParameter } from '../constructs/ActualParameter.js';
import type Module from '../constructs/Module.js';
import type Parameter from '../constructs/Parameter.js';
import TypeType from '../constructs/TypeType.js';
import ValueType from '../constructs/ValueType.js';
import { NonTerminalProductionType } from '../ProductionType.js';

// Assignment ::=
//     TypeAssignment
// 	| ValueAssignment
// 	| XMLValueAssignment
// 	| ValueSetTypeAssignment
// 	| ObjectClassAssignment
// 	| ObjectAssignment
// 	| ObjectSetAssignment
// 	| ParameterizedAssignment

// TODO: populate `parameterIndex`?

/**
 * @summary Convert a `Parameter` to an `ActualParameter`
 * @description
 * When unnesting, all parameters of the unnested assignment get converted to
 * actual parameters of the `Defined*` AST node that replaces the formerly
 * nested AST node. There is a good chance that some parameters will be unused,
 * but this is preferable to missing one of the original parameters of the
 * assignment that is used within the unnested subset of that assignment.
 *
 * @param {Parameter} param The parameter to be converted.
 * @param {Module} currentModule The current ASN1.1 module.
 * @returns {ActualParameter} The resulting parameter.
 * @function
 */
export default function convertParameterToActualParameter(
  param: Parameter,
  currentModule: Module
): ActualParameter {
  switch (param.assignmentType) {
    case AssignmentType.ValueAssignment: {
      return {
        // DefinedValue
        text: param.dummyReference,
        valueType: ValueType.DefinedValue,
        value: {
          reference: param.dummyReference,
          assignmentType: AssignmentType.ValueAssignment,
          computedModule: currentModule.name,
        },
      };
    }
    case AssignmentType.ValueSetTypeAssignment: {
      return {
        // ValueSet (There is no DefinedValueSet alternative for ActualParameter.)
        productionType: NonTerminalProductionType.ElementSetSpecs,
        rootElementSetSpec: {
          unions: [
            {
              intersections: [
                {
                  elements: param.dummyReference,
                },
              ],
            },
          ],
        },
        explicitlyExtensible: false,
      };
    }
    case AssignmentType.TypeAssignment: {
      return {
        // DefinedType
        text: param.dummyReference,
        typeType: TypeType.DefinedType,
        type: {
          reference: param.dummyReference,
          assignmentType: AssignmentType.ValueAssignment,
          computedModule: currentModule.name,
        },
      };
    }
    case AssignmentType.ObjectAssignment: {
      return {
        // DefinedObject
        reference: param.dummyReference,
        assignmentType: AssignmentType.ObjectAssignment,
        computedModule: currentModule.name,
      };
    }
    case AssignmentType.ObjectSetAssignment: {
      return {
        // ObjectSet (There is no DefinedObjectSet alternative for ActualParameter.)
        productionType: NonTerminalProductionType.ObjectSetSpec,
        rootElementSetSpec: {
          unions: [
            {
              intersections: [
                {
                  elements: {
                    reference: param.dummyReference,
                    assignmentType: AssignmentType.ObjectSetAssignment,
                    computedModule: currentModule.name,
                  },
                },
              ],
            },
          ],
        },
        explicitlyExtensible: false,
      };
    }
    case AssignmentType.ObjectClassAssignment: {
      return {
        reference: param.dummyReference,
        assignmentType: AssignmentType.ObjectClassAssignment,
        computedModule: currentModule.name,
      };
    }
    default: {
      throw new Error(param.assignmentType);
    }
  }
}
