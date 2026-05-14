import type GrokedThing from '../interfaces/GrokedThing.mjs';
import AssignmentType from './AssignmentType.mjs';
import type Defined from './Defined.mjs';
import { type Type } from './Type.mjs';

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
