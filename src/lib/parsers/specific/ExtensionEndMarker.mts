import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import * as parserFor from './index.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ExtensionEndMarker ::= "," "..."`
 */
export const ExtensionEndMarker: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ExtensionEndMarker, [
      literal(ProductionType.comma),
      parserFor.ellipsis,
    ])
);
export default ExtensionEndMarker;
