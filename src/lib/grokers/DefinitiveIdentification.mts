import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import { type NameAndOrNumber } from '../constructs/NameAndOrNumber.mjs';
import grokDefinitiveOID from './DefinitiveOID.mjs';

// DefinitiveIdentification ::=
// 	DefinitiveOID
// 	| DefinitiveOIDandIRI
// 	| empty

// DefinitiveOID ::=
//     "{" DefinitiveObjIdComponentList "}"

// DefinitiveOIDandIRI ::=
//     DefinitiveOID IRIValue

export default function grok(
  cst: Production,
  ctx: GrokContext
): [NameAndOrNumber[], string | undefined] | undefined {
  const text: string = ctx.text;
  if (cst.children[0].type === ProductionType.DefinitiveOID) {
    return [grokDefinitiveOID(cst.children[0], ctx), undefined];
  } else {
    // Then it is DefinitiveOIDandIRI
    const DefinitiveOIDandIRI: Production = cst.children[0];
    const DefinitiveOID: Production = DefinitiveOIDandIRI.children[0];
    const IRIValue: Production =
      DefinitiveOIDandIRI.children[DefinitiveOIDandIRI.children.length - 1];
    return [
      grokDefinitiveOID(DefinitiveOID, ctx),
      text
        .slice(IRIValue.location.startIndex, IRIValue.location.endIndex)
        .replace(/"/g, ''),
    ];
  }
}
