import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
