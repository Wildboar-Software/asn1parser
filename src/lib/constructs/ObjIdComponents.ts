import type NameAndOrNumberForm from './NameAndOrNumberForm.js';
import type DefinedValue from './Defined.js';

// ObjIdComponents ::=
//     NameForm
// 	| NumberForm
// 	| NameAndNumberForm
// 	| DefinedValue

export type ObjIdComponents = NameAndOrNumberForm | DefinedValue;
