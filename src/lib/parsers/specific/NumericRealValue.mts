import {
  aliasFor,
  choiceOf,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `NumericRealValue ::= realnumber | "-" realnumber | SequenceValue`
 */
export const NumericRealValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.NumericRealValue, [
        optional(literal(ProductionType.hyphen)),
        choiceOf([
          literal(ProductionType.realnumber),
          literal(ProductionType.number),
        ]),
      ]),
      aliasFor(ProductionType.NumericRealValue, parserFor.SequenceValue),
    ])
);
export default NumericRealValue;
