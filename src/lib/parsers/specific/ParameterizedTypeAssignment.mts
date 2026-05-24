import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ParameterizedTypeAssignment ::= typereference ParameterList "::=" Type`
 */
export const ParameterizedTypeAssignment: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ParameterizedTypeAssignment, [
      parserFor.typereference,
      parserFor.ParameterList,
      literal(ProductionType.assignment),
      parserFor.Type,
    ])
);
export default ParameterizedTypeAssignment;
