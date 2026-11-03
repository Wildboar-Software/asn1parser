import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import type OctetStringValue from '../../constructs/Values/OctetStringValue.mjs';
import grokValue from '../Value.mjs';
import { ProductionType } from '../../ProductionType.mjs';
import ASN1SyntaxError from '../../errors/ASN1SyntaxError.mjs';

// OctetStringValue ::=
//     bstring
// 	| hstring
// 	| CONTAINING Value

export default function grokOctetStringValue(
  cst: Production,
  ctx: GrokContext
): OctetStringValue {
  const base: number = ctx.textStartsAtOffset ?? 0;
  const text: string = ctx.text;
  switch (cst.children[0].type) {
    case ProductionType.bstring: {
      return {
        bstring: text
          .slice(cst.location.startIndex - base, cst.location.endIndex - base)
          .replace(/'/g, '')
          .replace(/\s+/g, '')
          .replace('B', ''),
        production: cst,
      };
    }
    case ProductionType.hstring: {
      return {
        hstring: text
          .slice(cst.location.startIndex - base, cst.location.endIndex - base)
          .replace(/'/g, '')
          .replace(/\s+/g, '')
          .replace('H', ''),
        production: cst,
      };
    }
    case ProductionType._CONTAINING: {
      return {
        containing: grokValue(cst.children[cst.children.length - 1], ctx),
        production: cst,
      };
    }
    default: {
      throw new ASN1SyntaxError(
        cst,
        `Unrecognized OctetStringValue alternative '${cst.children[0].type}'.`,
        ctx.currentModule.name,
      );
    }
  }
}
