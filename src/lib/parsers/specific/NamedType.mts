import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `NamedType ::= identifier Type`
 */
export const NamedType: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.NamedType, [
      literal(ProductionType.identifier),
      parserFor.Type,
    ])
);
export default NamedType;
