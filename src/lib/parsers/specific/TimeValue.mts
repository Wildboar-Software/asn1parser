import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import { ProductionType } from '../../ProductionType.mjs';

/**
 * `TimeValue ::= tstring`
 *
 * X.680 `tstring` is quoted like `cstring`. The lexer emits `cstring` for
 * every `"..."` token, so this production also accepts `cstring`.
 */
export const TimeValue: Parser = recursiveParser(
  (): Parser =>
    choiceOf([
      literal(ProductionType.cstring, ProductionType.TimeValue),
      literal(ProductionType.tstring, ProductionType.TimeValue),
    ])
);
export default TimeValue;
