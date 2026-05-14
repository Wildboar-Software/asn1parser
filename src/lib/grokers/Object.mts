import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import { type Object_ } from '../constructs/AssignmentTypes/ObjectAssignment/Object.js';
import grokDefined from './Defined.js';
import grokObjectDefn from './Object/ObjectDefn.js';
import grokObjectFromObject from './Object/ObjectFromObject.js';

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
