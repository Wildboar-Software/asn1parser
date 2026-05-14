import {
  choiceOf,
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `NumericRealValue ::= realnumber | "-" realnumber | SequenceValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.NumericRealValue, [
        optional(literal(ProductionType.hyphen)),
        choiceOf([
          literal(ProductionType.realnumber),
          literal(ProductionType.number),
        ]),
      ]),
      parserFor.SequenceValue,
    ])
);
