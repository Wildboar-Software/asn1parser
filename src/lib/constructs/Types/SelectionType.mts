import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import { type Type } from '../Type.mjs';

/**
 * A selection of a type from another `CHOICE` type by its identifier.
 * This syntax is rarely used in practice.
 * 
 * ```bnf
 * SelectionType ::= identifier "<" Type
 * ```
 */
export default interface SelectionType extends GrokedThing {

  /**
   * The identifier of the alternative whose type is to be taken from the
   * `CHOICE` type given by `type`.
   */
  identifier: string;

  /**
   * The `CHOICE` type from which the alternative's type is taken.
   */
  type: Type;
}
