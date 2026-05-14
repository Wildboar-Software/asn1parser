import type GrokedThing from '../interfaces/GrokedThing.js';
import { type ConstraintSpec } from './ConstraintSpec.js';
import { type ExceptionIdentification } from './ExceptionIdentification.js';

// Constraint ::= "(" ConstraintSpec ExceptionSpec ")"

export default interface Constraint extends GrokedThing {
  spec: ConstraintSpec;
  exception?: ExceptionIdentification;
}
