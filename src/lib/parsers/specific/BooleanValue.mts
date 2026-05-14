import { literal, choiceOf } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import recursiveParser from '../generic/recursiveParser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
