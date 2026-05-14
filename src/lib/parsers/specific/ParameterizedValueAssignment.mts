import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ParameterizedValueAssignment ::= valuereference ParameterList Type "::=" Value`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ParameterizedValueAssignment, [
      parserFor.valuereference,
      parserFor.ParameterList,
      parserFor.Type,
      literal(ProductionType.assignment),
      parserFor.Value,
    ])
);
