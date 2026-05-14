import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
