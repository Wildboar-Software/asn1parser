import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Governor ::= Type | DefinedObjectClass`
 */
export const Governor: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.Type, parserFor.DefinedObjectClass],
      ProductionType.Governor
    )
);
export default Governor;
