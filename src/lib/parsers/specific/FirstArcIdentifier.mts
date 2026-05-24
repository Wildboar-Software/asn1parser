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
export const FirstArcIdentifier: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.FirstArcIdentifier, [
      literal(ProductionType.forwardSlash),
      parserFor.ArcIdentifier,
    ])
);
export default FirstArcIdentifier;
