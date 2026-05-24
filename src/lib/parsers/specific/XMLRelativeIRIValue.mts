import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLRelativeIRIValue ::= FirstRelativeArcIdentifier SubsequentArcIdentifier`
 */
export const XMLRelativeIRIValue: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.XMLRelativeIRIValue, [
      parserFor.FirstRelativeArcIdentifier,
      parserFor.SubsequentArcIdentifier,
    ])
);
export default XMLRelativeIRIValue;
