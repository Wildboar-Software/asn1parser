import type GrokedThing from '../interfaces/GrokedThing.js';
import type DefinedValue from './Defined.js';

// ObjIdComponents ::=
//     NameForm
// 	| NumberForm
// 	| NameAndNumberForm
// 	| DefinedValue

// NameForm ::=
//     identifier

// NumberForm ::=
//     number
// 	| DefinedValue

// NameAndNumberForm ::=
//     identifier "(" NumberForm ")"

/**
 * This differs from `NameAndOrNumber` in supporting `DefinedValue` as an
 * alternative for the number.
 */
export default interface NameAndOrNumberForm extends GrokedThing {
  name?: string;
  number?: number | DefinedValue;
}
