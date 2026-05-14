import { type CommonAssignment } from '../Assignment.mjs';
import AssignmentType from '../AssignmentType.mjs';
import type Defined from '../Defined.mjs';
import { type ObjectSet } from '../ObjectSet.mjs';

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
