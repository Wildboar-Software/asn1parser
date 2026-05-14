import { type Object_ } from './AssignmentTypes/ObjectAssignment/Object.js';
import type Defined from './Defined.js';
import { type SomethingFromObject } from './SomethingFromObject.js';

// ObjectSetElements ::=
//     Object
//     | DefinedObjectSet
//     | ObjectSetFromObjects
//     | ParameterizedObjectSet

export type ObjectSetElements = Object_ | Defined | SomethingFromObject;
