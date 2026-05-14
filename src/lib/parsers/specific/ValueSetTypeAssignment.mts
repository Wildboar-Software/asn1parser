import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
