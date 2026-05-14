import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ParameterizedObjectAssignment ::= objectreference ParameterList DefinedObjectClass "::=" Object`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ParameterizedObjectAssignment, [
      parserFor.objectreference,
      parserFor.ParameterList,
      parserFor.DefinedObjectClass,
      literal(ProductionType.assignment),
      parserFor.Object,
    ])
);
