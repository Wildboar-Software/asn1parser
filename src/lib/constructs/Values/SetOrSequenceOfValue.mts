import { type Value } from '../Value.mjs';

// SequenceOfValue ::=
//     "{" ValueList "}"
// 	| "{" NamedValueList "}"
// 	| "{" "}"

// ValueList ::=
// 	Value
// 	| ValueList "," Value

// NamedValueList ::=
//     NamedValue
// 	| NamedValueList "," NamedValue

/**
 * An ASN.1 `SEQUENCE OF` or `SET OF` value. It is a list of
 * the identifiers of the corresponding components and their values.
 * If this is a `SEQUENCE OF` type, the ordering matters.
 * 
 * ```bnf
 * SequenceOfValue ::=
 *     "{" ValueList "}"
 *   | "{" NamedValueList "}"
 *   | "{" "}"
 * ```
 * 
 * ValueList ::=
 *     Value
 *   | ValueList "," Value
 * 
 * NamedValueList ::=
 *     NamedValue
 *   | NamedValueList "," NamedValue
 * ```
 */
export type SetOrSequenceOfValue = {
  identifier?: string;
  value: Value;
}[];
