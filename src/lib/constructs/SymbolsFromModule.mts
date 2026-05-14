import type GrokedThing from '../interfaces/GrokedThing.mjs';
import { type AssignedIdentifier } from './AssignedIdentifier.mjs';
import SelectionOption from './SelectionOption.mjs';

// SymbolsFromModule ::=
// 	SymbolList FROM GlobalModuleReference SelectionOption

// GlobalModuleReference ::=
//     modulereference AssignedIdentifier

// AssignedIdentifier ::=
//     ObjectIdentifierValue
// 	| DefinedValue
// 	| empty

export default interface SymbolsFromModule extends GrokedThing {
  identifier: string;
  assignedIdentifier: AssignedIdentifier;
  /**
   * Currently, values are set to `null` if the symbol is present,
   * and `undefined` if it is not.
   */
  symbolList: Record<string, any>;
  selectionOption?: SelectionOption;
}
