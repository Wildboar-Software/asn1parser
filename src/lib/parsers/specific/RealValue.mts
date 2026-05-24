import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RealValue ::= NumericRealValue | SpecialRealValue`
 */
export const RealValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.NumericRealValue, parserFor.SpecialRealValue],
      ProductionType.RealValue
    )
);
export default RealValue;
