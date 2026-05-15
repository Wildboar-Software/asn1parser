import { type CommonFieldSpec } from '../FieldSpec.mjs';
import { type Type } from '../Type.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

/**
 * A field of an information object class that has a type.
 *
 * ```bnf
 * TypeFieldSpec ::= typefieldreference TypeOptionalitySpec?
 * TypeOptionalitySpec ::= OPTIONAL | DEFAULT Type
 * ```
 */
export default interface TypeFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.TypeFieldSpec;

  /**
   * The default type for this field.
   */
  default?: Type;
}
