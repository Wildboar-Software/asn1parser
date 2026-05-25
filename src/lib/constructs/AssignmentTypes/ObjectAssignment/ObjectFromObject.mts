import { type ReferencedObjects } from '../../ReferencedObjects.mjs';
import { type FieldName } from '../../FieldName.mjs';
import type GrokedThing from '../../../interfaces/GrokedThing.mjs';

/**
 * An ASN.1 information object taken from a field of an object.
 *
 * ```bnf
 * ObjectFromObject ::= ReferencedObjects "." FieldName
 * ```
 */
export default interface ObjectFromObject extends GrokedThing {
  referencedObjects: ReferencedObjects;
  fieldName: FieldName;
}
