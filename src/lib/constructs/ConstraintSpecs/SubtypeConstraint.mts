import type ElementSetSpecs from '../ElementSetSpecs.mjs';

/**
 * A subtype constraint: a constraint that creates a new subtype of a more
 * general type.
 *
 * ```bnf
 * SubtypeConstraint ::= ElementSetSpecs
 * ```
 */
export type SubtypeConstraint = ElementSetSpecs<string>;
