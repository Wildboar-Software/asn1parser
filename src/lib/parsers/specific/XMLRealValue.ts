import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLRealValue ::= XMLNumericRealValue | XMLSpecialRealValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.XMLNumericRealValue, parserFor.XMLSpecialRealValue],
      ProductionType.XMLRealValue
    )
);
