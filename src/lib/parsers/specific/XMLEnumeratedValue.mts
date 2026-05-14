import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
