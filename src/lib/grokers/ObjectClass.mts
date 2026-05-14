import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type ObjectClass } from '../constructs/AssignmentTypes/ObjectClassAssignment/ObjectClass.mjs';
import grokDefined from './Defined.mjs';
import grokObjectClassDefn from './ObjectClassDefn.mjs';

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
