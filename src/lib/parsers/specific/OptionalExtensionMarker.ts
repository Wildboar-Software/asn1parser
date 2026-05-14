import {
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import * as parserFor from './index.js';
import ProductionType from '../../ProductionType.js';

/**
 * `OptionalExtensionMarker ::= "," "..." | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.OptionalExtensionMarker, [
        literal(ProductionType.comma),
        parserFor.ellipsis,
      ])
    )
);
