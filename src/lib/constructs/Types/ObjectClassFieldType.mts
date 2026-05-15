import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import type Defined from '../Defined.mjs';
import { type FieldName } from '../FieldName.mjs';

/**
 * An ASN.1 `ObjectClassFieldType`, which is a type taken from a field of an
 * information object class.
 * 
 * ```bnf
 * ObjectClassFieldType ::= DefinedObjectClass "." FieldName
 * ```
 */
export default interface ObjectClassFieldType extends GrokedThing {
  /**
   * A reference to the object class that this type is taken from.
   */
  definedObjectClass: Defined;
  /**
   * The sequence of primitive field names to query recursively to obtain the
   * type. This is a sequence of field names, because each field could itself
   * be an object. For instance, in `object1.&relatedObject.&AssociatedType`,
   * the `&relatedObject` could itself be another object. The last component
   * of this sequence must always refer to a type.
   */
  fieldName: FieldName;
}
