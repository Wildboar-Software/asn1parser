import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ObjectAssignment ::= objectreference DefinedObjectClass "::=" Object`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ObjectAssignment, [
      parserFor.objectreference,
      parserFor.DefinedObjectClass,
      literal(ProductionType.assignment),
      parserFor.Object,
    ])
);
