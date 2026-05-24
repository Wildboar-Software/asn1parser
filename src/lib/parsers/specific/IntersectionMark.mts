import choiceOf from '../generic/choiceOf.mjs';
import literal from '../generic/literal.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import recursiveParser from '../generic/recursiveParser.mjs';

/**
 * `IntersectionMark ::= "^" | INTERSECTION`
 */
export const IntersectionMark: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [literal(ProductionType.caret), literal(ProductionType._INTERSECTION)],
      ProductionType.IntersectionMark
    )
);
export default IntersectionMark;
