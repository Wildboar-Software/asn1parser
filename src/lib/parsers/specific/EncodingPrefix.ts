import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `EncodingPrefix ::= "[" EncodingReference EncodingInstruction "]"`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.EncodingPrefix, [
      literal(ProductionType.squareOpening),
      parserFor.EncodingReference,
      parserFor.EncodingInstruction,
      literal(ProductionType.squareClosing),
    ])
);
