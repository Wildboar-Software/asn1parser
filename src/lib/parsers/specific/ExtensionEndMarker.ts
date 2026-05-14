import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import * as parserFor from './index.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ExtensionEndMarker ::= "," "..."`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ExtensionEndMarker, [
      literal(ProductionType.comma),
      parserFor.ellipsis,
    ])
);
