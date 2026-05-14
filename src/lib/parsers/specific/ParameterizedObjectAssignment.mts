import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
