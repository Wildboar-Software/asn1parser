import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type Object_ } from '../constructs/AssignmentTypes/ObjectAssignment/Object.mjs';
import grokDefined from './Defined.mjs';
import grokObjectDefn from './Object/ObjectDefn.mjs';
import grokObjectFromObject from './Object/ObjectFromObject.mjs';

// Object ::=
//     DefinedObject
//     | ObjectDefn
//     | ObjectFromObject
//     | ParameterizedObject

// ParameterizedObject ::=
//     DefinedObject ActualParameterList

export default function grok(cst: Production, ctx: GrokContext): Object_ {
  switch (cst.children[0].type) {
    case ProductionType.DefinedObject: {
      return grokDefined(cst.children[0], ctx);
    }
    case ProductionType.ParameterizedObject: {
      return grokDefined(cst, ctx);
    }
    case ProductionType.ObjectDefn: {
      return grokObjectDefn(cst.children[0], ctx);
    }
    case ProductionType.ObjectFromObject: {
      return grokObjectFromObject(cst.children[0], ctx);
    }
    default: {
      throw new Error(
        `Unrecognized Object alternative '${cst.children[0].type}'.`
      );
    }
  }
}
