import type NameAndOrNumberForm from './NameAndOrNumberForm.mjs';
import type DefinedValue from './Defined.mjs';

// ObjIdComponents ::=
//     NameForm
// 	| NumberForm
// 	| NameAndNumberForm
// 	| DefinedValue

export type ObjIdComponents = NameAndOrNumberForm | DefinedValue;
