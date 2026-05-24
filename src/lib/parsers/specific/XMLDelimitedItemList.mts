import { recursiveParser, whitespaceDelimitedList } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLDelimitedItemList ::= XMLDelimitedItem | XMLDelimitedItem XMLDelimitedItemList`
 */
export const XMLDelimitedItemList: Parser = recursiveParser(
  (): Parser =>
    whitespaceDelimitedList(
      ProductionType.XMLDelimitedItemList,
      parserFor.XMLDelimitedItem
    )
);
export default XMLDelimitedItemList;
