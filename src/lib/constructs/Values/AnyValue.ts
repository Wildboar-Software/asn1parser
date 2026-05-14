import type GrokedThing from '../../interfaces/GrokedThing.js';
import { type Type } from '../Type.js';
import { type Value } from '../Value.js';

/**
 * `AnyValue ::= Type Value`
 */
export default interface AnyValue extends GrokedThing {
  type: Type;
  value: Value;
}
