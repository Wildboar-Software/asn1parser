import type GrokedThing from '../interfaces/GrokedThing.mjs';
import { type Type } from './Type.mjs';

/**
 * A name associated with a type, often used in `SEQUENCE` and `SET` definitions.
 * 
 * ```bnf
 * NamedType ::= identifier Type
 * ```
 */
export default interface NamedType extends GrokedThing {
  identifier: string;
  type: Type;
}
