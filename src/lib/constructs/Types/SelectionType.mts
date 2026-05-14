import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import { type Type } from '../Type.mjs';

export default interface SelectionType extends GrokedThing {
  identifier: string;
  type: Type;
}
