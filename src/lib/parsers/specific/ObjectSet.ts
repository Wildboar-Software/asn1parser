import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ObjectSet ::= "{" ObjectSetSpec "}"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ObjectSet, [
      literal(ProductionType.curlyOpening),
      parserFor.ObjectSetSpec,
      literal(ProductionType.curlyClosing),
    ])
);
