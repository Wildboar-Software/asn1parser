import { type ObjIdComponents } from '../ObjIdComponents.js';

// RelativeOIDValue ::=
//     "{" RelativeOIDComponentsList "}"

// RelativeOIDComponentsList ::=
//     RelativeOIDComponents
// 	| RelativeOIDComponents RelativeOIDComponentsList

// RelativeOIDComponents ::=
//     NumberForm
// 	| NameAndNumberForm
// 	| DefinedValue

/**
 * `ObjIdComponents` technically does differ from `RelativeOIDComponents` in
 * that the `NameForm` alternative is prohibited in the latter, but this is
 * good enough.
 */
export type RelativeOIDValue = ObjIdComponents[];
