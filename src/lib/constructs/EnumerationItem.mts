import type GrokedThing from '../interfaces/GrokedThing.mjs';
import type Defined from './Defined.mjs';

export default interface EnumerationItem extends GrokedThing {
  /**
   * The textual identifier of the enumeration variant.
   */
  identifier: string;

  /**
   * The explicitly associated numerical value of the enumeration
   * variant, which may be unspecified.
   */
  number?: number | Defined;

  /**
   * Whether this enumeration item came from the `AdditionalEnumeration`
   * list.
   */
  additional: boolean;
}
