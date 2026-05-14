import { choiceOf, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TokenOrGroupSpec ::= RequiredToken | OptionalGroup`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.RequiredToken, parserFor.OptionalGroup],
      ProductionType.TokenOrGroupSpec
    )
);
