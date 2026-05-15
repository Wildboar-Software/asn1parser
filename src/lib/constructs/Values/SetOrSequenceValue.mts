import { type Value } from '../Value.mjs';

/**
 * An ASN.1 `SEQUENCE` or `SET` value. It is a list of
 * the identifiers of the corresponding components and their values.
 * If this is a `SEQUENCE` type, the ordering matters.
 * 
 * ```bnf
 * SequenceValue ::=
 *     "{" ComponentValueList "}"
 *   | "{" "}"
 * ```
 * 
 * ComponentValueList ::=
 *     NamedValue
 *   | ComponentValueList "," NamedValue
 * ```
 */
export type SetOrSequenceValue = {
  identifier: string;
  value: Value;
}[];
