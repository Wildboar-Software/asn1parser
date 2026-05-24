import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ObjectAssignment ::= objectreference DefinedObjectClass "::=" Object`
 */
export const ObjectAssignment: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ObjectAssignment, [
      parserFor.objectreference,
      parserFor.DefinedObjectClass,
      literal(ProductionType.assignment),
      parserFor.Object,
    ])
);
export default ObjectAssignment;
