import type GrokedThing from '../../interfaces/GrokedThing.js';
import { type Type } from '../Type.js';
import { type Value } from '../Value.js';

// OpenTypeFieldVal ::= Type ":" Value

export default interface OpenTypeFieldVal extends GrokedThing {
  type: Type;
  value: Value;
}
