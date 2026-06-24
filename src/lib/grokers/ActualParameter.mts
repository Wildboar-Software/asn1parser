import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type ActualParameter } from '../constructs/ActualParameter.mjs';
import grokDefined from './Defined.mjs';
import grokValueSet from './ValueSet.mjs';
import grokObject from './Object.mjs';
import grokObjectSet from './ObjectSet.mjs';
import grokType from './Type.mjs';
import grokValue from './Value.mjs';
import ASN1SyntaxError from '../errors/ASN1SyntaxError.mjs';

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
      throw new ASN1SyntaxError(
        cst.children[0],
        `Unrecognized alternative of ActualParameter '${cst.children[0].type}'.`,
        ctx.currentModule.name,
      );
    }
  }
}
