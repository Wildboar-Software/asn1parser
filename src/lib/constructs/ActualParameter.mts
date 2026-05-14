import { type Type } from './Type.mjs';
import { type Value } from './Value.mjs';
import { type ValueSet } from './ValueSet.mjs';
import type DefinedObjectClass from  './Defined.mjs';
import { type Object_ } from './AssignmentTypes/ObjectAssignment/Object.mjs';
import { type ObjectSet } from './ObjectSet.mjs';

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
