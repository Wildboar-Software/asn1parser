import type GrokedThing from '../interfaces/GrokedThing.js';
import AssignmentType from './AssignmentType.js';
import type Defined from './Defined.js';
import { type Type } from './Type.js';

// Parameter ::=
//     ParamGovernor ":" DummyReference
//     | DummyReference

// ParamGovernor ::=
//     Governor
//     | DummyGovernor

// Governor ::=
//     Type
//     | DefinedObjectClass

// DummyGovernor ::=
//     DummyReference

// DummyReference ::=
//     Reference

// Reference ::=
//     typereference
//      | valuereference
//      | objectclassreference
//      | objectreference
//      | objectsetreference

export default interface Parameter extends GrokedThing {
  paramGovernor?: string | Defined | Type;
  dummyReference: string;
  assignmentType?: AssignmentType;
}
