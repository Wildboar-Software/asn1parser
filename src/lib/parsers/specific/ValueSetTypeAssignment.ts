import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ValueSetTypeAssignment ::= typereference Type "::=" ValueSet`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ValueSetTypeAssignment, [
      parserFor.typereference,
      parserFor.Type,
      literal(ProductionType.assignment),
      parserFor.ValueSet,
    ])
);
