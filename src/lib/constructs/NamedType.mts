import type GrokedThing from '../interfaces/GrokedThing.js';
import { type Type } from './Type.js';

// NamedType ::= identifier Type

export default interface NamedType extends GrokedThing {
  identifier: string;
  type: Type;
}
