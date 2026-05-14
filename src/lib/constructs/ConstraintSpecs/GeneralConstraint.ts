import { type ContentsConstraint } from './GeneralConstraint/ContentsConstraint.js';
import { type TableConstraint } from './GeneralConstraint/TableConstraint.js';
import type UserDefinedConstraint from './GeneralConstraint/UserDefinedConstraint.js';

export type GeneralConstraint =
  | ContentsConstraint
  | TableConstraint
  | UserDefinedConstraint;
