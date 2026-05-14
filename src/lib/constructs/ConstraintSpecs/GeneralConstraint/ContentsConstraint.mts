import { type Value } from '../../Value.mjs';
import { type Type } from '../../Type.mjs';
import type GrokedThing from '../../../interfaces/GrokedThing.mjs';

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
