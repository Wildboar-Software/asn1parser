import type GrokedThing from '../interfaces/GrokedThing.mjs';
import { type AssignedIdentifier } from './AssignedIdentifier.mjs';
import SelectionOption from './SelectionOption.mjs';
import type Production from '../Production.mjs';

// SymbolsFromModule ::=
// 	SymbolList FROM GlobalModuleReference SelectionOption

// GlobalModuleReference ::=
//     modulereference AssignedIdentifier

// AssignedIdentifier ::=
//     ObjectIdentifierValue
// 	| DefinedValue
// 	| empty

/**
 * A list of symbols imported from a module.
 * 
 * ```bnf
 * SymbolsFromModule ::= SymbolList FROM GlobalModuleReference SelectionOption
 * ```
 */
export default interface SymbolsFromModule extends GrokedThing {

  /** The "name" of the module, such as "AuthenticationFramework." */
  identifier: string;

  /** The assigned object identifier of the module. */
  assignedIdentifier: AssignedIdentifier;

  /**
   * The symbols are the keys of this property, and their productions in the
   * Concrete Syntax Tree (CST), if known, are the values.
   */
  symbolList: Record<string, Production | undefined>;

  /**
   * Options for identifying alternatives of an ASN.1 module from
   * which symbols are imported.
   * 
   * From ITU-T Recommendation X.680 (2021), Section 13.16.f:
   * 
   * > If the "SelectionOption" is WITH SUCCESSORS, the module denoted by the
   * > "GlobalModuleReference" is the one that has a DefinitiveIdentification with an
   * > object identifier whose last node may be incremented zero or more times. If
   * > multiple modules meet this criterion, the denoted module is the one whose
   * > object identifier has the last node with the greatest number of increments.
   * 
   * > If the "SelectionOption" is WITH DESCENDANTS, the module denoted by the
   * > "GlobalModuleReference" is the one that has a DefinitiveIdentification
   * >that identifies the node identified by the "GlobalModuleReference" or one
   * > of its subordinates. If multiple modules meet this criterion, the denoted
   * > module is the one with the largest object identifier. For this comparison,
   * > the arcs are compared successively until one arc is different (selecting
   * > the largest arc) or the end of one object identifier is reached (selecting
   * > the longer object identifier).
   */
  selectionOption?: SelectionOption;
}
