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

export type RealValue =
  | number
  | {
      mantissa: IntegerValue;
      base: IntegerValue;
      exponent: IntegerValue;
    };
