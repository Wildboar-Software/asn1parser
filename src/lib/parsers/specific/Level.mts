import {
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
