import type GrokedThing from '../../interfaces/GrokedThing.js';
import { type Type } from '../Type.js';

export default interface SelectionType extends GrokedThing {
  identifier: string;
  type: Type;
}
