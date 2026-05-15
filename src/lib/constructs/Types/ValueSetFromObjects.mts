import { type SomethingFromObject } from  '../SomethingFromObject.mjs';

/**
 * A value set taken from a field of an object.
 *
 * ```bnf
 * ValueSetFromObjects ::= ReferencedObjects "." FieldName
 * ```
 */
export type ValueSetFromObjects = SomethingFromObject;
