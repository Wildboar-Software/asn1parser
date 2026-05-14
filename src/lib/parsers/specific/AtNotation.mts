import {
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.mjs';
import * as parserFor from '../specific/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `AtNotation ::= "@" ComponentIdList | "@." Level ComponentIdList`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf([
      whitespaceTolerantSequenceOf(ProductionType.AtNotation, [
        literal(ProductionType.atSign),
        parserFor.ComponentIdList,
      ]),
      whitespaceTolerantSequenceOf(ProductionType.AtNotation, [
        literal(ProductionType.atSign),
        literal(ProductionType.period),
        parserFor.Level,
        parserFor.ComponentIdList,
      ]),
    ])
);
