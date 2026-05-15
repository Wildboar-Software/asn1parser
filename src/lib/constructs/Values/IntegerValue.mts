/**
 * An ASN.1 `INTEGER` value: either the number itself or an
 * identifier that references a named number.
 * 
 * ```bnf
 * IntegerValue ::=
 *   SignedNumber
 *   | identifier
 * ```
 */
export type IntegerValue = number | string;
