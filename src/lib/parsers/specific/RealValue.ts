import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `RealValue ::= NumericRealValue | SpecialRealValue`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.NumericRealValue, parserFor.SpecialRealValue],
      ProductionType.RealValue
    )
);
