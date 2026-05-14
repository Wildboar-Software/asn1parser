import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import { type AssignedIdentifier } from '../constructs/AssignedIdentifier.js';
import grokDefined from './Defined.js';
import grokObjectIdentifierValue from './Values/ObjectIdentifierValue.js';

// AssignedIdentifier ::=
//     ObjectIdentifierValue
// 	| DefinedValue
// 	| empty

export default function grok(
  cst: Production,
  ctx: GrokContext
): AssignedIdentifier {
  if (!cst.children[0]) {
    return undefined;
  }
  switch (cst.children[0].type) {
    case ProductionType.ObjectIdentifierValue: {
      return grokObjectIdentifierValue(cst.children[0], ctx);
    }
    case ProductionType.DefinedValue: {
      return grokDefined(cst.children[0], ctx);
    }
    default: {
      throw new Error(
        `Unrecognized alternative of AssignedIdentifier '${cst.children[0].type}'.`
      );
    }
  }
}
