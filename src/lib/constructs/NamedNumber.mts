import type GrokedThing from '../interfaces/GrokedThing.mjs';
import type Defined from './Defined.mjs';

export default interface NamedNumber extends GrokedThing {
  identifier: string;
  number: number | Defined;
}
