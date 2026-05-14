import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
