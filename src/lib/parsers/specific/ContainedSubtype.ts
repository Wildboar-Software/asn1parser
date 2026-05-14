import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `ContainedSubtype ::= Includes Type`
 */
export default recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ContainedSubtype, [
      // parserFor.Includes, // Includes is just an optional INCLUDES, which makes no sense.
      literal(ProductionType._INCLUDES),
      parserFor.Type,
    ])
);
