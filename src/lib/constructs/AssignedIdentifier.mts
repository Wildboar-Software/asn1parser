import type ObjectIdentifierValue from  './Values/ObjectIdentifierValue.mjs';
import type Defined from './Defined.mjs';

// AssignedIdentifier ::=
//     ObjectIdentifierValue
// 	| DefinedValue
// 	| empty
export type AssignedIdentifier = ObjectIdentifierValue | Defined | undefined;
