import type ComponentRelationConstraint from './TableConstraint/ComponentRelationConstraint.mjs';
import { type SimpleTableConstraint } from './TableConstraint/SimpleTableConstraint.mjs';

/**
 * A constraint that makes use of an abstract table of information objects.
 */
export type TableConstraint = ComponentRelationConstraint | SimpleTableConstraint;
