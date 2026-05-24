import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `RelativeIRIValue ::= """ FirstRelativeArcIdentifier SubsequentArcIdentifier """`
 */
export const RelativeIRIValue: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.RelativeIRIValue, [
      literal(ProductionType.quotationMark),
      parserFor.FirstRelativeArcIdentifier,
      parserFor.SubsequentArcIdentifier,
      literal(ProductionType.quotationMark),
    ])
);
export default RelativeIRIValue;
