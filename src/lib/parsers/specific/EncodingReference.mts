import {
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import * as parserFor from './index.js';

/**
 * `EncodingReference ::= encodingreference ":" | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.EncodingReference, [
        parserFor.encodingreference,
        literal(ProductionType.colon),
      ])
    )
);
