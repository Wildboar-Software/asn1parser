import choiceOf from '../generic/choiceOf.js';
import literal from '../generic/literal.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import recursiveParser from '../generic/recursiveParser.js';

/**
 * `UnionMark ::= "|" | UNION`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [literal(ProductionType.verticalBar), literal(ProductionType._UNION)],
      ProductionType.UnionMark
    )
);
