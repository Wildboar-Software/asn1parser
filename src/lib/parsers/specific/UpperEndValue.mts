import { choiceOf, literal, recursiveParser } from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `UpperEndValue ::= Value | MAX`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.Value, literal(ProductionType._MAX)],
      ProductionType.UpperEndValue
    )
);
