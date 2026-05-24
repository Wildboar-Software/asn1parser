import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ObjectClassAssignment ::= objectclassreference "::=" ObjectClass`
 */
export const ObjectClassAssignment: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ObjectClassAssignment, [
      literal(ProductionType.objectclassreference),
      literal(ProductionType.assignment),
      parserFor.ObjectClass,
    ])
);
export default ObjectClassAssignment;
