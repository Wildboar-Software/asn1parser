import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import * as parserFor from './index.mjs';

/**
 * `FirstArcIdentifier ::= "/" ArcIdentifier`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.FirstArcIdentifier, [
      literal(ProductionType.forwardSlash),
      parserFor.ArcIdentifier,
    ])
);
