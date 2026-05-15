import { type SomethingFromObject } from  '../SomethingFromObject.mjs';

/**
 * A type taken from a field of an object.
 *
 * ```bnf
 * TypeFromObject ::= ReferencedObjects "." FieldName
 * ```
 */
export type TypeFromObject = SomethingFromObject;
