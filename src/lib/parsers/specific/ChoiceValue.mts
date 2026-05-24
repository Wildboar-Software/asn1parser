import {
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `ChoiceValue ::= identifier ":" Value`
 */
export const ChoiceValue: Parser = recursiveParser(
  (): Parser =>
    whitespaceTolerantSequenceOf(ProductionType.ChoiceValue, [
      literal(ProductionType.identifier),
      literal(ProductionType.colon),
      parserFor.Value,
    ])
);
export default ChoiceValue;
