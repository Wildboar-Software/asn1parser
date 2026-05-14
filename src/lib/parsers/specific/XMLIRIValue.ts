import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLIRIValue ::= FirstArcIdentifier SubsequentArcIdentifier`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.XMLIRIValue, [
      parserFor.FirstArcIdentifier,
      parserFor.SubsequentArcIdentifier,
    ])
);
