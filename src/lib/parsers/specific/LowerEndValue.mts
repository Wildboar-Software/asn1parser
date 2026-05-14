import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `LowerEndValue ::= Value | MIN`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.Value, literal(ProductionType._MIN)],
      ProductionType.LowerEndValue
    )
);
