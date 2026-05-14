import type ComponentRelationConstraint from './TableConstraint/ComponentRelationConstraint.js';
import { type SimpleTableConstraint } from './TableConstraint/SimpleTableConstraint.js';

export type TableConstraint = ComponentRelationConstraint | SimpleTableConstraint;
