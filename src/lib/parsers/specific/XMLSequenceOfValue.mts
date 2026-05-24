import { choiceOf, optional, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLSequenceOfValue ::= XMLValueList | XMLDelimitedItemList | empty`
 */
export const XMLSequenceOfValue: Parser = recursiveParser(
  (): Parser =>
    optional(
      choiceOf(
        [parserFor.XMLValueList, parserFor.XMLDelimitedItemList],
        ProductionType.XMLSequenceOfValue
      )
    )
);
export default XMLSequenceOfValue;
