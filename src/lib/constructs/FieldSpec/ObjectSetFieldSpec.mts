import { type CommonFieldSpec } from '../FieldSpec.mjs';
import type Defined from '../Defined.mjs';
import { type ObjectSet } from '../ObjectSet.mjs';
import FieldSpecType from '../FieldSpecType.mjs';

/**
 * A field of an information object class that is an object set.
 *
 * ```bnf
 * ObjectSetFieldSpec ::= objectsetfieldreference DefinedObjectClass ObjectSetOptionalitySpec ?
 * ObjectSetOptionalitySpec ::= OPTIONAL | DEFAULT ObjectSet
 * ```
 */
export default interface ObjectSetFieldSpec extends CommonFieldSpec {
  specType: FieldSpecType.ObjectSetFieldSpec;

  /**
   * A reference to the information object class of which this field's
   * information objects must be instances.
   */
  definedObjectClass: Defined;

  /**
   * The default value for this field.
   */
  default?: ObjectSet;
}
