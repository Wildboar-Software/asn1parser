import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import { type Type } from '../Type.mjs';
import { type Value } from '../Value.mjs';

/**
 * `AnyValue ::= Type Value`
 */
export default interface AnyValue extends GrokedThing {
  /** The type of the `ANY` value. */
  type: Type;
  /** The value of the `ANY` value. */
  value: Value;
}
