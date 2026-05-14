import type GrokContext from '../interfaces/GrokContext.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import type SymbolsFromModule from '../constructs/SymbolsFromModule.js';
import grokSymbolsFromModule from './SymbolsFromModule.js';

// Imports ::=
//     IMPORTS SymbolsImported ";"
// 	| empty

// SymbolsImported ::=
//     SymbolsFromModuleList
// 	| empty

// SymbolsFromModuleList ::=
//     SymbolsFromModule
// 	| SymbolsFromModuleList SymbolsFromModule

// ; The SelectionOption was added in ITU X.680, Amendment 1.
// SymbolsFromModule ::=
// 	SymbolList FROM GlobalModuleReference SelectionOption

// GlobalModuleReference ::=
//     modulereference AssignedIdentifier

// AssignedIdentifier ::=
//     ObjectIdentifierValue
// 	| DefinedValue
// 	| empty

export default function grokImports(
  cst: Production,
  ctx: GrokContext
): { [module: string]: SymbolsFromModule } {
  if (cst.children.length === 0) {
    return {};
  }

  const ret: { [module: string]: SymbolsFromModule } = {};
  const SymbolsImported: Production = cst.children
    .slice(1, -1)
    .filter(
      (child: Production): boolean => child.type !== ProductionType.whitespace
    )[0];

  if (SymbolsImported.children.length === 0) {
    return {};
  }

  const SymbolsFromModuleList: Production = SymbolsImported.children[0];
  SymbolsFromModuleList.children
    .filter(
      (child: Production): boolean => child.type !== ProductionType.whitespace
    )
    .forEach((symbolsFromModule: Production): void => {
      const sfm: SymbolsFromModule = grokSymbolsFromModule(
        symbolsFromModule,
        ctx
      );
      ret[sfm.identifier] = sfm;
    });

  return ret;
}
