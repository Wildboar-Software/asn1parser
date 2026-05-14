import {
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `Level ::= "." Level | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.Level, [
        literal(ProductionType.period),
        parserFor.Level,
      ])
    )
);
