import type GrokedThing from '../interfaces/GrokedThing.mjs';
import type Defined from './Defined.mjs';

/**
 * A number and an associated name / identifier.
 */
export default interface NamedNumber extends GrokedThing {
  identifier: string;
  number: number | Defined;
}
