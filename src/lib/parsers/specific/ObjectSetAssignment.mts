import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ObjectSetAssignment ::= objectsetreference DefinedObjectClass "::=" ObjectSet`
 */
export const ObjectSetAssignment: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ObjectSetAssignment, [
      parserFor.objectsetreference,
      parserFor.DefinedObjectClass,
      literal(ProductionType.assignment),
      parserFor.ObjectSet,
    ])
);
export default ObjectSetAssignment;
