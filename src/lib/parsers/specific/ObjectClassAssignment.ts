import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ObjectClassAssignment ::= objectclassreference "::=" ObjectClass`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ObjectClassAssignment, [
      literal(ProductionType.objectclassreference),
      literal(ProductionType.assignment),
      parserFor.ObjectClass,
    ])
);
