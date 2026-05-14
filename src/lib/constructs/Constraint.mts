import type GrokedThing from '../interfaces/GrokedThing.mjs';
import { type ConstraintSpec } from './ConstraintSpec.mjs';
import { type ExceptionIdentification } from './ExceptionIdentification.mjs';

// Constraint ::= "(" ConstraintSpec ExceptionSpec ")"

export default interface Constraint extends GrokedThing {
  spec: ConstraintSpec;
  exception?: ExceptionIdentification;
}
