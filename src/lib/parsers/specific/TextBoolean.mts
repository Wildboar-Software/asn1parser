import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `TextBoolean ::= extended-true | extended-false`
 */
export const TextBoolean: Parser = recursiveParser(
  (): Parser =>
    choiceOf(
      [
        literal(ProductionType.extended_true),
        literal(ProductionType.extended_false),
      ],
      ProductionType.TextBoolean
    )
);
export default TextBoolean;
