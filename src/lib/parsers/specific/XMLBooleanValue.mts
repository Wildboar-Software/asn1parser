import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLBooleanValue ::= EmptyElementBoolean | TextBoolean`
 */
export const XMLBooleanValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.EmptyElementBoolean, parserFor.TextBoolean],
      ProductionType.XMLBooleanValue
    )
);
export default XMLBooleanValue;
