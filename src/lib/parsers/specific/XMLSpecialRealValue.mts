import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLSpecialRealValue ::= EmptyElementReal | TextReal`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.EmptyElementReal, parserFor.TextReal],
      ProductionType.XMLSpecialRealValue
    )
);
