import { literal, choiceOf } from '../generic/index.js';
import type Parser from '../../Parser.js';
import recursiveParser from '../generic/recursiveParser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `BooleanValue ::= TRUE | FALSE`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [literal(ProductionType._TRUE), literal(ProductionType._FALSE)],
      ProductionType.BooleanValue
    )
);
