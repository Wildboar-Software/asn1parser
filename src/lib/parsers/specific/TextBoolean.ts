import { choiceOf, literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TextBoolean ::= extended-true | extended-false`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        literal(ProductionType.extended_true),
        literal(ProductionType.extended_false),
      ],
      ProductionType.TextBoolean
    )
);
