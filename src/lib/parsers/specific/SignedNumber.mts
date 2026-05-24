import {
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `SignedNumber ::= number | "-" number`
 */
export const SignedNumber: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.SignedNumber, [
      optional(literal(ProductionType.hyphen)),
      literal(ProductionType.number),
    ])
);
export default SignedNumber;
