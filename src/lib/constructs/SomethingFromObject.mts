import type GrokedThing from '../interfaces/GrokedThing.mjs';
import { type ReferencedObjects } from './ReferencedObjects.mjs';
import { type FieldName } from './FieldName.mjs';

/**
 * A type that may be used for any ASN.1 production that refers to a field of
 * an object, such as `ValueFromObject` or `TypeFromObject`.
 * 
 * ```bnf
 * ValueFromObject ::= ReferencedObjects "." FieldName
 * ValueSetFromObjects ::= ReferencedObjects "." FieldName
 * TypeFromObject ::= ReferencedObjects "." FieldName
 * ObjectFromObject ::= ReferencedObjects "." FieldName
 * ObjectSetFromObjects ::= ReferencedObjects "." FieldName
 * ```
 */
export interface SomethingFromObject extends GrokedThing {
  referencedObjects: ReferencedObjects;
  fieldName: FieldName;
}
