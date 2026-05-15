import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import { type Type } from '../Type.mjs';
import { type Value } from '../Value.mjs';

// OpenTypeFieldVal ::= Type ":" Value

/**
 * An ASN.1 value corresponding to a type taken from a field from an
 * information object that itself has an open type.
 * 
 * ```bnf
 * OpenTypeFieldVal ::= Type ":" Value
 * ```
 */
export default interface OpenTypeFieldVal extends GrokedThing {
  type: Type;
  value: Value;
}
