import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ParameterizedValueSetTypeAssignment ::= typereference ParameterList Type "::=" ValueSet`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(
      ProductionType.ParameterizedValueSetTypeAssignment,
      [
        parserFor.typereference,
        parserFor.ParameterList,
        parserFor.Type,
        literal(ProductionType.assignment),
        parserFor.ValueSet,
      ]
    )
);
