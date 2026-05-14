import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TypeAssignment ::= typereference "::=" Type`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.TypeAssignment, [
      parserFor.typereference,
      literal(ProductionType.assignment),
      parserFor.Type,
    ])
);
