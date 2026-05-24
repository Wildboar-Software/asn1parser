import {
  choiceOf,
  literal,
  recursiveParser,
  sequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLNumericRealValue ::= realnumber | "-" & realnumber`
 */
export const XMLNumericRealValue: Parser = recursiveParser(
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
export default XMLNumericRealValue;
