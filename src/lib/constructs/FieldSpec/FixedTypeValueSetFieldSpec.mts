import { type CommonFieldSpec } from '../FieldSpec.mjs';
import { type Type } from '../Type.mjs';
import { type ValueSet } from '../ValueSet.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

/**
 * A field of an information object class that has a fixed type and a value set.
 *
 * ```bnf
 * FixedTypeValueSetFieldSpec ::=
 *     valuesetfieldreference Type ValueSetOptionalitySpec ?
 * ```
 */
export default interface FixedTypeValueSetFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.FixedTypeValueSetFieldSpec;

  /**
   * The type of the values of the value set of this field.
   */
  type: Type;

  /**
   * The default value set for this field.
   */
  default?: ValueSet;
}
