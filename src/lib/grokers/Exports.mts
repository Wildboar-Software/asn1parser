import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import type { Exports } from '../constructs/Exports.mjs';

// Exports ::=
//     EXPORTS SymbolsExported ";"
// 	| EXPORTS ALL ";"
// 	| empty

// SymbolsExported ::=
//     SymbolList
//     | empty

// SymbolList ::=
//     Symbol
// 	| SymbolList "," Symbol

export default function grokExports(
  cst: Production,
  ctx: GrokContext
): Exports | undefined {
  const text: string = ctx.text;
  if (cst.children.length === 0) {
    return undefined;
  }
  if (
    cst.children.some(
      (child: Production): boolean => child.type === ProductionType._ALL
    )
  ) {
    return undefined;
  }
  const ret: Exports = {
    production: cst,
    exportedSymbols: {},
  };
  const base: number = ctx.textStartsAtOffset ?? 0;
  cst.children
    .slice(1, -1)
    .filter(
      (child: Production): boolean => child.type !== ProductionType.whitespace
    )[0]
    .children // SymbolList
    .filter(
      (child: Production): boolean =>
        child.type !== ProductionType.whitespace &&
        child.type !== ProductionType.comma
    )
    .forEach((symbol: Production): void => {
      const identifier = text.slice(
        symbol.location.startIndex - base,
        symbol.location.endIndex - base,
      );
      ret.exportedSymbols[identifier] = symbol;
    });

  return ret;
}
