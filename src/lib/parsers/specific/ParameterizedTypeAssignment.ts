import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ParameterizedTypeAssignment ::= typereference ParameterList "::=" Type`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ParameterizedTypeAssignment, [
      parserFor.typereference,
      parserFor.ParameterList,
      literal(ProductionType.assignment),
      parserFor.Type,
    ])
);
