import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import type OctetStringValue from '../../constructs/Values/OctetStringValue.mjs';
import grokValue from '../Value.mjs';
import ProductionType from '../../ProductionType.mjs';

// OctetStringValue ::=
//     bstring
// 	| hstring
// 	| CONTAINING Value

export default function grokOctetStringValue(
  cst: Production,
  ctx: GrokContext
): OctetStringValue {
  const text: string = ctx.text;
  switch (cst.children[0].type) {
    case ProductionType.bstring: {
      return {
        bstring: text
          .slice(cst.location.startIndex, cst.location.endIndex)
          .replace(/'/g, '')
          .replace(/\s+/g, '')
          .replace('B', ''),
      };
    }
    case ProductionType.hstring: {
      return {
        hstring: text
          .slice(cst.location.startIndex, cst.location.endIndex)
          .replace(/'/g, '')
          .replace(/\s+/g, '')
          .replace('H', ''),
      };
    }
    case ProductionType._CONTAINING: {
      return {
        containing: grokValue(cst.children[cst.children.length - 1], ctx),
      };
    }
    default: {
      throw new Error(
        `Unrecognized OctetStringValue alternative '${cst.children[0].type}'.`
      );
    }
  }
}
