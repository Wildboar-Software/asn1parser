import {
  assert,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `PartialSpecification ::= "{" "..." "," TypeConstraints "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.PartialSpecification, [
      literal(ProductionType.curlyOpening),
      parserFor.ellipsis,
      literal(ProductionType.comma),
      assert(
        parserFor.TypeConstraints,
        literal(ProductionType.curlyClosing),
        '537432A4-1443-488C-AA84-B889277B794A'
      ),
      literal(ProductionType.curlyClosing),
    ])
);
