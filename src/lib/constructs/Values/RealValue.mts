import { type IntegerValue } from './IntegerValue.mjs';

// RealValue ::=
//     NumericRealValue
// 	| SpecialRealValue

// NumericRealValue ::=
//     realnumber
// 	| "-" realnumber
// 	| SequenceValue

// SpecialRealValue ::=
//     PLUS-INFINITY
// 	| MINUS-INFINITY
// 	| NOT-A-NUMBER

/**
 * An ASN.1 `REAL` value: either a number or a sequence of three numbers
 * representing the mantissa, base, and exponent of a real number.
 * 
 * ```bnf
 * RealValue ::= NumericRealValue | SpecialRealValue
 * 
 * NumericRealValue ::=
 *     realnumber
 *   | "-" realnumber
 *   | SequenceValue
 * 
 * SpecialRealValue ::=
 *     PLUS-INFINITY
 *   | MINUS-INFINITY
 *   | NOT-A-NUMBER
 * ```
 */
export type RealValue =
  | number
  | {
      mantissa: IntegerValue;
      base: IntegerValue;
      exponent: IntegerValue;
    };
