import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLEnumeratedValue ::= EmptyElementEnumerated | TextEnumerated`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.EmptyElementEnumerated, parserFor.TextEnumerated],
      ProductionType.XMLEnumeratedValue
    )
);
