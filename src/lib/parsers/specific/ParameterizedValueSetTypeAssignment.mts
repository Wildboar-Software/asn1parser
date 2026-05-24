import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ParameterizedValueSetTypeAssignment ::= typereference ParameterList Type "::=" ValueSet`
 */
export const ParameterizedValueSetTypeAssignment: Parser = recursiveParser(
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
export default ParameterizedValueSetTypeAssignment;
