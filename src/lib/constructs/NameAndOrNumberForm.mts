import type GrokedThing from '../interfaces/GrokedThing.mjs';
import type DefinedValue from './Defined.mjs';

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
 * An object identifier arc as a name and/or a number.
 * 
 * This differs from `NameAndOrNumber` in supporting `DefinedValue` as an
 * alternative for the number.
 */
export default interface NameAndOrNumberForm extends GrokedThing {
  name?: string;
  number?: number | DefinedValue;
}
