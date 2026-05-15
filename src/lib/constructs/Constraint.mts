import type GrokedThing from '../interfaces/GrokedThing.mjs';
import { type ConstraintSpec } from './ConstraintSpec.mjs';
import { type ExceptionIdentification } from './ExceptionIdentification.mjs';

// Constraint ::= "(" ConstraintSpec ExceptionSpec ")"

/**
 * A constraint for subtyping a type.
 */
export default interface Constraint extends GrokedThing {
  spec: ConstraintSpec;
  exception?: ExceptionIdentification;
}
