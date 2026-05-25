import type GrokContext from '../../interfaces/GrokContext.mjs';
import type Production from '../../Production.mjs';
import type BitStringValue from '../../constructs/Values/BitStringValue.mjs';
import ProductionType from '../../ProductionType.mjs';
import grokValue from '../Value.mjs';

// BitStringValue ::=
//     bstring
// 	| hstring
// 	| "{" IdentifierList "}"
// 	| "{" "}"
// 	| CONTAINING Value

// export default
// interface BitStringValue {
//     bstring?: string;
//     hstring?: string;
//     identifiers?: string[];
//     containing?: string;
// }

export default function grokBitStringValue(
  cst: Production,
  ctx: GrokContext
): BitStringValue {
  const text: string = ctx.text;
  switch (cst.children[0].type) {
    case ProductionType.bstring: {
      return {
        bstring: text
          .slice(
            cst.children[0].location.startIndex,
            cst.children[0].location.endIndex
          )
          .replace(/'/g, '')
          .replace(/\s+/g, '')
          .replace('B', ''),
        production: cst,
      };
    }
    case ProductionType.hstring: {
      return {
        hstring: text
          .slice(
            cst.children[0].location.startIndex,
            cst.children[0].location.endIndex
          )
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
    case ProductionType.curlyOpening: {
      const IdentifierList: Production | undefined = cst.children.find(
        (p: Production): boolean => p.type === ProductionType.IdentifierList
      );
      if (!IdentifierList) {
        return {
          identifiers: [],
          production: cst,
        };
      }
      return {
        identifiers: IdentifierList.children
          .filter((p: Production) => p.type === ProductionType.identifier)
          .map((identifier: Production): string =>
            text.slice(
              identifier.location.startIndex,
              identifier.location.endIndex
            )
          ),
        production: cst,
      };
    }
    default: {
      throw new Error(
        `Unrecognized BitStringValue alternative '${cst.children[0].type}'.`
      );
    }
  }
}
