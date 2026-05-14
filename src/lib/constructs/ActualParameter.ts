import { type Type } from './Type.js';
import { type Value } from './Value.js';
import { type ValueSet } from './ValueSet.js';
import type DefinedObjectClass from  './Defined.js';
import { type Object_ } from './AssignmentTypes/ObjectAssignment/Object.js';
import { type ObjectSet } from './ObjectSet.js';

// ActualParameter ::=
//     Type
//     | Value
//     | ValueSet
//     | DefinedObjectClass
//     | Object
//     | ObjectSet
export type ActualParameter =
  | Type
  | Value
  | ValueSet
  | DefinedObjectClass
  | Object_
  | ObjectSet;
