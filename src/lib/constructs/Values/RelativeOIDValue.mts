import { type ObjIdComponents } from '../ObjIdComponents.mjs';

/**
 * An ASN.1 `RELATIVE-OID` value, which is a list of object identifier components.
 * 
 * ```bnf
 * RelativeOIDValue ::= "{" RelativeOIDComponentsList "}"
 * 
 * RelativeOIDComponentsList ::=
 *     RelativeOIDComponents
 *   | RelativeOIDComponents RelativeOIDComponentsList
 * 
 * RelativeOIDComponents ::=
 *     NumberForm
 *   | NameAndNumberForm
 *   | DefinedValue
 * ```
 * 
 * `ObjIdComponents` technically does differ from `RelativeOIDComponents` in
 * that the `NameForm` alternative is prohibited in the latter, but this is
 * good enough.
 */
export type RelativeOIDValue = ObjIdComponents[];
