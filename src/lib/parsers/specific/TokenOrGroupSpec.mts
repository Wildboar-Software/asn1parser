import { choiceOf, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TokenOrGroupSpec ::= RequiredToken | OptionalGroup`
 */
export const TokenOrGroupSpec: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.RequiredToken, parserFor.OptionalGroup],
      ProductionType.TokenOrGroupSpec
    )
);
export default TokenOrGroupSpec;
