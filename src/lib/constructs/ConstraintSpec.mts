import { type GeneralConstraint } from './ConstraintSpecs/GeneralConstraint.js';
import { type SubtypeConstraint } from './ConstraintSpecs/SubtypeConstraint.js';

export type ConstraintSpec = GeneralConstraint | SubtypeConstraint;
