import { recursiveParser, whitespaceDelimitedList } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLValueList ::= XMLValueOrEmpty | XMLValueOrEmpty XMLValueList`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceDelimitedList(
      ProductionType.XMLValueList,
      parserFor.XMLValueOrEmpty
    )
);
