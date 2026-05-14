import choiceOf from '../generic/choiceOf.js';
import literal from '../generic/literal.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import recursiveParser from '../generic/recursiveParser.js';

/**
 * `IntersectionMark ::= "^" | INTERSECTION`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [literal(ProductionType.caret), literal(ProductionType._INTERSECTION)],
      ProductionType.IntersectionMark
    )
);
