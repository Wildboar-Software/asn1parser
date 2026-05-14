import type GrokedThing from '../interfaces/GrokedThing.mjs';
import { type Type } from './Type.mjs';

// NamedType ::= identifier Type

export default interface NamedType extends GrokedThing {
  identifier: string;
  type: Type;
}
