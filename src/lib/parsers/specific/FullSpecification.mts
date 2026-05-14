import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `FullSpecification ::= "{" TypeConstraints "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.FullSpecification, [
      literal(ProductionType.curlyOpening),
      parserFor.TypeConstraints,
      literal(ProductionType.curlyClosing),
    ])
);
