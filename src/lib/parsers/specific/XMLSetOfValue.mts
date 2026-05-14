import { choiceOf, optional, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLSetOfValue ::= XMLValueList | XMLDelimitedItemList | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      choiceOf(
        [parserFor.XMLValueList, parserFor.XMLDelimitedItemList],
        ProductionType.XMLSetOfValue
      )
    )
);
