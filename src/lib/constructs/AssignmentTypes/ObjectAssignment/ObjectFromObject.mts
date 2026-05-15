import { type ReferencedObjects } from '../../ReferencedObjects.mjs';
import { type FieldName } from '../../FieldName.mjs';

/**
 * An ASN.1 information object taken from a field of an object.
 *
 * ```bnf
 * ObjectFromObject ::= ReferencedObjects "." FieldName
 * ```
 */
export default interface ObjectFromObject {
  referencedObjects: ReferencedObjects;
  fieldName: FieldName;
}
