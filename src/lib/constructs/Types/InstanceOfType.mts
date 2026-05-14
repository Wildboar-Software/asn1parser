import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import type Defined from '../Defined.mjs';

export default interface InstanceOfType extends GrokedThing {
  definedObjectClass: Defined;
}
