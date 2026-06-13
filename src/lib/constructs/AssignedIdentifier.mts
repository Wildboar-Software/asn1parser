import type ObjectIdentifierValue from  './Values/ObjectIdentifierValue.mjs';
import type Defined from './Defined.mjs';

/**
 * Identifier for an ASN.1 module.
 * 
 * ```bnf
 * AssignedIdentifier ::= ObjectIdentifierValue | DefinedValue | empty
 * ```
 */
export type AssignedIdentifier = ObjectIdentifierValue | Defined | undefined;
