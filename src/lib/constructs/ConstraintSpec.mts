import { type GeneralConstraint } from './ConstraintSpecs/GeneralConstraint.mjs';
import { type SubtypeConstraint } from './ConstraintSpecs/SubtypeConstraint.mjs';

export type ConstraintSpec = GeneralConstraint | SubtypeConstraint;
