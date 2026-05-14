import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
