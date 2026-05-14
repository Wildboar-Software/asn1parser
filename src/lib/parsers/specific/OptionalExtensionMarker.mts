import {
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import * as parserFor from './index.mjs';
import ProductionType from '../../ProductionType.mjs';

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
