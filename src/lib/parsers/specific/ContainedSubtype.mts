import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ContainedSubtype ::= Includes Type`
 */
export const ContainedSubtype: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ContainedSubtype, [
      // parserFor.Includes, // Includes is just an optional INCLUDES, which makes no sense.
      literal(ProductionType._INCLUDES),
      parserFor.Type,
    ])
);
export default ContainedSubtype;
