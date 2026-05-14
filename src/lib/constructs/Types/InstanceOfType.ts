import type GrokedThing from '../../interfaces/GrokedThing.js';
import type Defined from '../Defined.js';

export default interface InstanceOfType extends GrokedThing {
  definedObjectClass: Defined;
}
