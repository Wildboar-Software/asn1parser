import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `RelativeIRIValue ::= """ FirstRelativeArcIdentifier SubsequentArcIdentifier """`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.RelativeIRIValue, [
      literal(ProductionType.quotationMark),
      parserFor.FirstRelativeArcIdentifier,
      parserFor.SubsequentArcIdentifier,
      literal(ProductionType.quotationMark),
    ])
);
