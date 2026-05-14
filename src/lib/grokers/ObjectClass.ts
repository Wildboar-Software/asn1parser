import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import { type ObjectClass } from '../constructs/AssignmentTypes/ObjectClassAssignment/ObjectClass.js';
import grokDefined from './Defined.js';
import grokObjectClassDefn from './ObjectClassDefn.js';

// ObjectClass ::=
//     DefinedObjectClass
//     | ObjectClassDefn
//     | ParameterizedObjectClass

export default function grok(cst: Production, ctx: GrokContext): ObjectClass {
  switch (cst.children[0].type) {
    case ProductionType.DefinedObjectClass: {
      return grokDefined(cst.children[0], ctx);
    }
    case ProductionType.ParameterizedObjectClass: {
      return grokDefined(cst, ctx);
    }
    case ProductionType.ObjectClassDefn: {
      return grokObjectClassDefn(cst.children[0], ctx);
    }
    default: {
      throw new Error(
        `Unrecognized ObjectClass alternative '${cst.children[0].type}'.`
      );
    }
  }
}
