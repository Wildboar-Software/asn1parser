import { type CommonFieldSpec } from '../FieldSpec.mjs';
import { type Type } from '../Type.mjs';
import { type Value } from '../Value.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

/**
 * A field of an information object class that has a fixed type.
 *
 * ```bnf
 * TypeFixedTypeValueFieldSpec ::=
 *     valuefieldreference Type UNIQUE? ValueOptionalitySpec ?
 * ```
 */
export default interface FixedTypeValueFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.FixedTypeValueFieldSpec;

  /**
   * The type of the value of this field.
   */
  type: Type;

  /**
   * Whether each information object must have a unique value for this field.
   */
  unique: boolean;

  /**
   * The default value for this field.
   */
  default?: Value;
}
