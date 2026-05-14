import type GrokedThing from '../../../interfaces/GrokedThing.js';

export default interface UserDefinedConstraint extends GrokedThing {
  constrainedBy: string[];
}
