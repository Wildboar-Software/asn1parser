import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLIdentifierList ::= EmptyElementList | TextList`
 */
export const XMLIdentifierList: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.EmptyElementList, parserFor.TextList],
      ProductionType.XMLIdentifierList
    )
);
export default XMLIdentifierList;
