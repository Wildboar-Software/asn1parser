import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import grokDefined from './Defined.mjs';
import grokType from './Type.mjs';
import type Parameter from '../constructs/Parameter.mjs';
import AssignmentType from '../constructs/AssignmentType.mjs';
import type GrokedThing from '../interfaces/GrokedThing.mjs';

// TODO: Move to a utils function
function isUpperCase(charCode: number): boolean {
  return charCode >= 0x41 && charCode <= 0x5a;
}

// TODO: Move to a utils function
function isAType(str: string): boolean {
  return (
    str.length !== 0 &&
    isUpperCase(str.charCodeAt(0)) &&
    str.toUpperCase() !== str
  );
}

// TODO: Move to a utils function
function isAClass(str: string): boolean {
  return str.length !== 0 && str.toUpperCase() === str;
}

/**
 * The logic for this function was taken directly from Dubuisson, page 382.
 */
function applyAssignmentType(parameter: Parameter): void {
  if (parameter.paramGovernor) {
    // It is either a Value, Value Set, Object, Or Object Set.
    if (typeof parameter.paramGovernor === 'string') {
      if (isAClass(parameter.paramGovernor)) {
        if (isUpperCase(parameter.dummyReference.charCodeAt(0))) {
          parameter.assignmentType = AssignmentType.ObjectSetAssignment;
        } else {
          parameter.assignmentType = AssignmentType.ObjectAssignment;
        }
      } else if (isAType(parameter.paramGovernor)) {
        if (isUpperCase(parameter.dummyReference.charCodeAt(0))) {
          parameter.assignmentType = AssignmentType.ValueSetTypeAssignment;
        } else {
          parameter.assignmentType = AssignmentType.ValueAssignment;
        }
      } else {
        return;
      }
    } else if ('reference' in parameter.paramGovernor) {
      if (isAClass(parameter.paramGovernor.reference)) {
        if (isUpperCase(parameter.dummyReference.charCodeAt(0))) {
          parameter.assignmentType = AssignmentType.ObjectSetAssignment;
        } else {
          parameter.assignmentType = AssignmentType.ObjectAssignment;
        }
      } else if (isAType(parameter.paramGovernor.reference)) {
        if (isUpperCase(parameter.dummyReference.charCodeAt(0))) {
          parameter.assignmentType = AssignmentType.ValueSetTypeAssignment;
        } else {
          parameter.assignmentType = AssignmentType.ValueAssignment;
        }
      } else {
        return;
      }
    } else if (isUpperCase(parameter.dummyReference.charCodeAt(0))) {
      parameter.assignmentType = AssignmentType.ValueSetTypeAssignment;
    } else {
      parameter.assignmentType = AssignmentType.ValueAssignment;
    }
  } else if (isUpperCase(parameter.dummyReference.charCodeAt(0))) {
    parameter.assignmentType = AssignmentType.TypeAssignment;
  } else {
    parameter.assignmentType = AssignmentType.ObjectAssignment;
  }
}

// Parameter ::=
//     ParamGovernor ":" DummyReference
//     | DummyReference

// ParamGovernor ::=
//     Governor
//     | DummyGovernor

// Governor ::=
//     Type
//     | DefinedObjectClass

// DummyGovernor ::=
//     DummyReference

// DummyReference ::=
//     Reference

// Reference ::=
//     typereference
//      | valuereference
//      | objectclassreference
//      | objectreference
//      | objectsetreference

export default function grok(cst: Production, ctx: GrokContext): Parameter {
  const text: string = ctx.text;

  const commonFields = {
    production: cst,
    productionType: cst.type,
    text: text.slice(cst.location.startIndex, cst.location.endIndex),
  } satisfies GrokedThing;

  const base: number = ctx.textStartsAtOffset ?? 0;
  if (cst.children.length === 1) {
    // It must have been DummyReference.
    const DummyReference: Production = cst.children[0];
    const Reference: Production = DummyReference.children[0];
    const ret: Parameter = {
      dummyReference: text.slice(
        Reference.location.startIndex - base,
        Reference.location.endIndex - base,
      ),
      ...commonFields,
    };
    applyAssignmentType(ret);
    return ret;
  }

  let ret!: Parameter;

  // Otherwise, it must have been ParamGovernor ":" DummyReference
  const ParamGovernor: Production = cst.children[0];
  const DummyReference: Production = cst.children[cst.children.length - 1];
  const Reference: Production = DummyReference.children[0];
  const Governor_Or_DummyGovernor: Production = ParamGovernor.children[0];
  if (Governor_Or_DummyGovernor.type === ProductionType.DummyGovernor) {
    const DummyGovernor: Production = Governor_Or_DummyGovernor;
    ret = {
      paramGovernor: text.slice(
        DummyGovernor.location.startIndex - base,
        DummyGovernor.location.endIndex - base,
      ),
      dummyReference: text.slice(
        Reference.location.startIndex - base,
        Reference.location.endIndex - base,
      ),
      ...commonFields,
    };
  } else {
    const Governor: Production = Governor_Or_DummyGovernor;
    if (Governor.children[0].type === ProductionType.DefinedObjectClass) {
      ret = {
        paramGovernor: grokDefined(Governor.children[0], ctx),
        dummyReference: text.slice(
          Reference.location.startIndex - base,
          Reference.location.endIndex - base,
        ),
        ...commonFields,
      };
    } else {
      ret = {
        paramGovernor: grokType(Governor.children[0], ctx),
        dummyReference: text.slice(
          Reference.location.startIndex - base,
          Reference.location.endIndex - base,
        ),
        ...commonFields,
      };
    }
  }
  applyAssignmentType(ret);
  return ret;
}
