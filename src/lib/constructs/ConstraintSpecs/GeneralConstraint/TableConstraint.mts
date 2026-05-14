import type ComponentRelationConstraint from './TableConstraint/ComponentRelationConstraint.mjs';
import { type SimpleTableConstraint } from './TableConstraint/SimpleTableConstraint.mjs';

export type TableConstraint = ComponentRelationConstraint | SimpleTableConstraint;
