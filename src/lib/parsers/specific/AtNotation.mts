import {
  choiceOf,
  literal,
  recursiveParser,
  whitespaceTolerantSequenceOf,
} from '../generic/index.js';
import * as parserFor from '../specific/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
