import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import { type Type } from '../Type.mjs';
import { type Value } from '../Value.mjs';

// OpenTypeFieldVal ::= Type ":" Value

export default interface OpenTypeFieldVal extends GrokedThing {
  type: Type;
  value: Value;
}
