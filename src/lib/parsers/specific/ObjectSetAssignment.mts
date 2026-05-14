import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ObjectSetAssignment ::= objectsetreference DefinedObjectClass "::=" ObjectSet`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ObjectSetAssignment, [
      parserFor.objectsetreference,
      parserFor.DefinedObjectClass,
      literal(ProductionType.assignment),
      parserFor.ObjectSet,
    ])
);
