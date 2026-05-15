import type GrokContext from '../interfaces/GrokContext.mjs';
import type Production from '../Production.mjs';
import ProductionType from '../ProductionType.mjs';
import type SymbolsFromModule from '../constructs/SymbolsFromModule.mjs';
import grokSymbolsFromModule from './SymbolsFromModule.mjs';
import type { Imports } from '../constructs/Imports.mjs';

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
): Imports {
  if (cst.children.length === 0) {
    return { production: cst, modules: {} };
  }

  const ret: Imports = { production: cst, modules: {} };
  const SymbolsImported: Production = cst.children
    .slice(1, -1)
    .filter(
      (child: Production): boolean => child.type !== ProductionType.whitespace
    )[0];

  if (SymbolsImported.children.length === 0) {
    return { production: cst, modules: {} };
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
      ret.modules[sfm.identifier] = sfm;
    });

  return ret;
}
