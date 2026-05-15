import type NameAndOrNumberForm from './NameAndOrNumberForm.mjs';
import type DefinedValue from './Defined.mjs';

/**
 * One of the forms that an object identifier arc can take on.
 * 
 * ```bnf
 * ObjIdComponents ::= NameForm | NumberForm | NameAndNumberForm | DefinedValue
 * ```
 */
export type ObjIdComponents = NameAndOrNumberForm | DefinedValue;
