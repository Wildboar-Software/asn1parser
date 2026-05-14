import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLBooleanValue ::= EmptyElementBoolean | TextBoolean`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.EmptyElementBoolean, parserFor.TextBoolean],
      ProductionType.XMLBooleanValue
    )
);
