import { choiceOf, optional, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLSequenceOfValue ::= XMLValueList | XMLDelimitedItemList | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      choiceOf(
        [parserFor.XMLValueList, parserFor.XMLDelimitedItemList],
        ProductionType.XMLSequenceOfValue
      )
    )
);
