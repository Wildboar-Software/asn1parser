import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type AssignedIdentifier } from '../constructs/AssignedIdentifier.mjs';
import grokDefined from './Defined.mjs';
import grokObjectIdentifierValue from './Values/ObjectIdentifierValue.mjs';
import ASN1SyntaxError from '../errors/ASN1SyntaxError.mjs';

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
      throw new ASN1SyntaxError(
        cst.children[0],
        `Unrecognized alternative of AssignedIdentifier '${cst.children[0].type}'.`,
        ctx.currentModule.name,
      );
    }
  }
}
