import { type Value } from '../../Value.js';
import { type Type } from '../../Type.js';
import type GrokedThing from '../../../interfaces/GrokedThing.js';

interface JustContaining extends GrokedThing {
  containing: Type;
}

interface JustEncodedBy extends GrokedThing {
  encodedBy: Value;
}

interface BothContainingAndEncodedBy extends JustContaining, JustEncodedBy {}

export type ContentsConstraint =
  | JustContaining
  | JustEncodedBy
  | BothContainingAndEncodedBy;
