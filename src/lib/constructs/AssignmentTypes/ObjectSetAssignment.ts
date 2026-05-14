import { type CommonAssignment } from '../Assignment.js';
import AssignmentType from '../AssignmentType.js';
import type Defined from '../Defined.js';
import { type ObjectSet } from '../ObjectSet.js';

// ObjectSetAssignment ::=
//     objectsetreference DefinedObjectClass "::=" ObjectSet

// ObjectSet ::=
//     "{" ObjectSetSpec "}"

// ObjectSetSpec ::=
//     RootElementSetSpec
//     | RootElementSetSpec "," "..."
//     | "..."
//     | "..." "," AdditionalElementSetSpec
//     | RootElementSetSpec "," "..." "," AdditionalElementSetSpec

export default interface ObjectSetAssignment extends CommonAssignment {
  assignmentType:
    | AssignmentType.ObjectSetAssignment
    | AssignmentType.ParameterizedObjectSetAssignment;
  definedObjectClass: Defined;
  objectSetSpec: ObjectSet;
}
