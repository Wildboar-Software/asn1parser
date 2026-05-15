import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import { type Value } from '../Value.mjs';

/**
 * A choice value for an ASN.1 `CHOICE` type.
 * 
 * ```bnf
 * ChoiceValue ::= identifier ":" Value
 * ```
 */
export default interface ChoiceValue extends GrokedThing {
  /** The identifier of the `CHOICE` alternative used. */
  identifier: string;
  /** The value of the `CHOICE` alternative. */
  value: Value;
}
