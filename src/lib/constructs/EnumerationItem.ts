import type GrokedThing from '../interfaces/GrokedThing.js';
import type Defined from './Defined.js';

export default interface EnumerationItem extends GrokedThing {
  identifier: string;
  number?: number | Defined;
  additional: boolean;
}
