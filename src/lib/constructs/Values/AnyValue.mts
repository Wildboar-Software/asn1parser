import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import { type Type } from '../Type.mjs';
import { type Value } from '../Value.mjs';

/**
 * `AnyValue ::= Type Value`
 */
export default interface AnyValue extends GrokedThing {
  type: Type;
  value: Value;
}
