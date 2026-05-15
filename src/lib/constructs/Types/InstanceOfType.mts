import type GrokedThing from '../../interfaces/GrokedThing.mjs';
import type Defined from '../Defined.mjs';

export default interface InstanceOfType extends GrokedThing {
  /**
   * A reference to the object class that values of this type refer to.
   */
  definedObjectClass: Defined;
}
