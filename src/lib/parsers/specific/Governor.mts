import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `Governor ::= Type | DefinedObjectClass`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.Type, parserFor.DefinedObjectClass],
      ProductionType.Governor
    )
);
