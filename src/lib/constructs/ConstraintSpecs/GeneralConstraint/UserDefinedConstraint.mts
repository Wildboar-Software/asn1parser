import type GrokedThing from '../../../interfaces/GrokedThing.mjs';

export default interface UserDefinedConstraint extends GrokedThing {
  constrainedBy: string[];
}
