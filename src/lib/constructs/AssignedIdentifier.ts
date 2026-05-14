import type ObjectIdentifierValue from  './Values/ObjectIdentifierValue.js';
import type Defined from './Defined.js';

// AssignedIdentifier ::=
//     ObjectIdentifierValue
// 	| DefinedValue
// 	| empty
export type AssignedIdentifier = ObjectIdentifierValue | Defined | undefined;
