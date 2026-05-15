import { type ObjectSet } from '../../../ObjectSet.mjs';

/**
 * A simple constraint that the set of information objects from which fields
 * may be drawn.
 * 
 * ```bnf
 * SimpleTableConstraint ::= ObjectSet
 * ```
 */
export type SimpleTableConstraint = ObjectSet;
