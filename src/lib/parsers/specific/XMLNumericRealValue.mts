import {
  choiceOf,
  literal,
  recursiveParser,
  sequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLNumericRealValue ::= realnumber | "-" & realnumber`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      sequenceOf(ProductionType.XMLNumericRealValue, [
        literal(ProductionType.hyphen),
        choiceOf([
          literal(ProductionType.realnumber),
          literal(ProductionType.number),
        ]),
      ]),
      choiceOf(
        [literal(ProductionType.realnumber), literal(ProductionType.number)],
        ProductionType.XMLNumericRealValue
      ),
    ])
);
