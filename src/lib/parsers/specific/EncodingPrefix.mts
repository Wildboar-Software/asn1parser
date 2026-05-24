import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `EncodingPrefix ::= "[" EncodingReference EncodingInstruction "]"`
 */
export const EncodingPrefix: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.EncodingPrefix, [
      literal(ProductionType.squareOpening),
      parserFor.EncodingReference,
      parserFor.EncodingInstruction,
      literal(ProductionType.squareClosing),
    ])
);
export default EncodingPrefix;
