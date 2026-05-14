import { type ContentsConstraint } from './GeneralConstraint/ContentsConstraint.mjs';
import { type TableConstraint } from './GeneralConstraint/TableConstraint.mjs';
import type UserDefinedConstraint from './GeneralConstraint/UserDefinedConstraint.mjs';

export type GeneralConstraint =
  | ContentsConstraint
  | TableConstraint
  | UserDefinedConstraint;
