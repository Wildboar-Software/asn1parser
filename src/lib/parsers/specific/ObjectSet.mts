import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ObjectSet ::= "{" ObjectSetSpec "}"`
 */
export const ObjectSet: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ObjectSet, [
      literal(ProductionType.curlyOpening),
      parserFor.ObjectSetSpec,
      literal(ProductionType.curlyClosing),
    ])
);
export default ObjectSet;
