import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import * as parserFor from './index.js';

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
