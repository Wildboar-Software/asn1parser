import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `UpperEndValue ::= Value | MAX`
 */
export const UpperEndValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [parserFor.Value, literal(ProductionType._MAX)],
      ProductionType.UpperEndValue
    )
);
export default UpperEndValue;
