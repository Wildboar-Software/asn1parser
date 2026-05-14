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
  symbolList: Record<string, any>;
  selectionOption?: SelectionOption;
}
