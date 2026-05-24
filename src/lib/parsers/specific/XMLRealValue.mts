import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLRealValue ::= XMLNumericRealValue | XMLSpecialRealValue`
 */
export const XMLRealValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.XMLNumericRealValue, parserFor.XMLSpecialRealValue],
      ProductionType.XMLRealValue
    )
);
export default XMLRealValue;
