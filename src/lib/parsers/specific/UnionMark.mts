import choiceOf from '../generic/choiceOf.mjs';
import literal from '../generic/literal.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import recursiveParser from '../generic/recursiveParser.mjs';

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
