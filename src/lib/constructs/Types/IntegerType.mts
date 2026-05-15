import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import type NamedNumber from '../NamedNumber.mjs';

export default interface IntegerType extends GrokedThing {
  /**
   * The list of named numbers, if any.
   */
  namedNumberList?: NamedNumber[];
  /**
   * Whether the `INTEGER` was defined without using the `DefinedValue`
   * production. If `true`, it means that there are no additional lookups
   * needed to resolve the numeric values of the named numbers.
   */
  selfContained?: boolean;
}
