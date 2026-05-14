import type GrokContext from '../interfaces/GrokContext.js';
import type SymbolsFromModule from '../constructs/SymbolsFromModule.js';
import type Production from '../Production.js';
import ProductionType from '../ProductionType.js';
import SelectionOption from '../constructs/SelectionOption.js';
import grokAssignedIdentifier from './AssignedIdentifier.js';

// SymbolsFromModule ::=
// 	SymbolList FROM GlobalModuleReference SelectionOption

// GlobalModuleReference ::=
//     modulereference AssignedIdentifier

// AssignedIdentifier ::=
//     ObjectIdentifierValue
// 	| DefinedValue
// 	| empty

export default function grokSymbolsFromModule(
  cst: Production,
  ctx: GrokContext
): SymbolsFromModule {
  const text: string = ctx.text;
  const components: Production[] = cst.children.filter(
    (child: Production): boolean => child.type !== ProductionType.whitespace
  );

  const SymbolList: Production = components[0];
  const GlobalModuleReference: Production = components[2];
  const _SelectionOption: Production | undefined =
    components.length > 3 ? components[3] : undefined;
  const modulereference: Production = GlobalModuleReference.children[0];
  const AssignedIdentifier: Production = GlobalModuleReference.children[2];

  const __SelectionOption: SelectionOption | undefined = (():
    | SelectionOption
    | undefined => {
    if (!_SelectionOption) {
      return undefined;
    }
    const last: Production =
      _SelectionOption.children[_SelectionOption.children.length - 1];
    if (last.type === ProductionType._DESCENDANTS) {
      return SelectionOption.WITH_DESCENDANTS;
    } else {
      return SelectionOption.WITH_SUCCESSORS;
    }
  })();

  const symbolMap: { [identifier: string]: any } = {};
  SymbolList.children
    .filter((child: Production) => child.type === ProductionType.Symbol)
    .map((child: Production): string =>
      text.slice(child.location.startIndex, child.location.endIndex)
    )
    .forEach((symbol: string): void => {
      symbolMap[symbol.replace(/\{.*\}/g, '')] = null;
    });

  return {
    identifier: text.slice(
      modulereference.location.startIndex,
      modulereference.location.endIndex
    ),
    assignedIdentifier: AssignedIdentifier
      ? grokAssignedIdentifier(AssignedIdentifier, ctx)
      : undefined,
    symbolList: symbolMap,
    selectionOption: __SelectionOption,
  };
}
