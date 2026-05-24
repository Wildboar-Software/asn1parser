import {
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `XMLIRIValue ::= FirstArcIdentifier SubsequentArcIdentifier`
 */
export const XMLIRIValue: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.XMLIRIValue, [
      parserFor.FirstArcIdentifier,
      parserFor.SubsequentArcIdentifier,
    ])
);
export default XMLIRIValue;
