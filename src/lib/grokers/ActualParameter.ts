import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import { type ActualParameter } from '../constructs/ActualParameter.js';
import grokDefined from './Defined.js';
import grokValueSet from './ValueSet.js';
import grokObject from './Object.js';
import grokObjectSet from './ObjectSet.js';
import grokType from './Type.js';
import grokValue from './Value.js';

// ActualParameter ::=
//     Type
//     | Value
//     | ValueSet
//     | DefinedObjectClass
//     | Object
//     | ObjectSet

// ValueSet ::= "{" ElementSetSpecs "}"
// ObjectSet ::= "{" ObjectSetSpec "}"

export default function grok(
  cst: Production,
  ctx: GrokContext
): ActualParameter {
  switch (cst.children[0].type) {
    case ProductionType.Type: {
      return grokType(cst.children[0], ctx);
    }
    case ProductionType.Value: {
      return grokValue(cst.children[0], ctx);
    }
    case ProductionType.ValueSet: {
      return grokValueSet(cst.children[0], ctx);
    }
    case ProductionType.DefinedObjectClass: {
      return grokDefined(cst.children[0], ctx);
    }
    case ProductionType.Object: {
      return grokObject(cst.children[0], ctx);
    }
    case ProductionType.ObjectSet: {
      return grokObjectSet(cst.children[0], ctx);
    }
    default: {
      throw new Error(
        `Unrecognized alternative of ActualParameter '${cst.children[0].type}'.`
      );
    }
  }
}
