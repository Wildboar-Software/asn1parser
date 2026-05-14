import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `XMLValueAssignment ::= valuereference "::=" XMLTypedValue`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.XMLValueAssignment, [
      parserFor.valuereference,
      literal(ProductionType.assignment),
      parserFor.XMLTypedValue,
    ])
);
