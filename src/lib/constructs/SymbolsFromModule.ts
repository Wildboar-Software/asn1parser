import type GrokedThing from '../interfaces/GrokedThing.js';
import { type AssignedIdentifier } from './AssignedIdentifier.js';
import SelectionOption from './SelectionOption.js';

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
