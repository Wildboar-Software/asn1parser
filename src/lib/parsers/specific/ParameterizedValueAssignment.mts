import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ParameterizedValueAssignment ::= valuereference ParameterList Type "::=" Value`
 */
export const ParameterizedValueAssignment: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ParameterizedValueAssignment, [
      parserFor.valuereference,
      parserFor.ParameterList,
      parserFor.Type,
      literal(ProductionType.assignment),
      parserFor.Value,
    ])
);
export default ParameterizedValueAssignment;
