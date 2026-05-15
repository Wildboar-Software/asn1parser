import { type Object_ } from './AssignmentTypes/ObjectAssignment/Object.mjs';
import type Defined from './Defined.mjs';
import { type SomethingFromObject } from './SomethingFromObject.mjs';

// ObjectSetElements ::=
//     Object
//     | DefinedObjectSet
//     | ObjectSetFromObjects
//     | ParameterizedObjectSet

/**
 * One of the individual items that may appear an `ObjectSet`.
 *
 * ```bnf
 * ObjectSetElements ::= Object | DefinedObjectSet | ObjectSetFromObjects | ParameterizedObjectSet
 * ```
 */
export type ObjectSetElements = Object_ | Defined | SomethingFromObject;
