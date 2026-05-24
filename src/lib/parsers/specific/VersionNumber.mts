import {
  literal,
  optional,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `VersionNumber ::= empty | number ":"`
 */
export const VersionNumber: Parser = recursiveParser(
  (): Parser =>
    optional(
      whitespaceTolerantSequenceOf(ProductionType.VersionNumber, [
        literal(ProductionType.number),
        literal(ProductionType.colon),
      ])
    )
);
export default VersionNumber;
