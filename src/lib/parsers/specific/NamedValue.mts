import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `NamedValue ::= identifier Value`
 */
export const NamedValue: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.NamedValue, [
      literal(ProductionType.identifier),
      parserFor.Value,
    ])
);
export default NamedValue;
