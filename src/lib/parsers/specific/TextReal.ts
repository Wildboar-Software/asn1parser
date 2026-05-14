import {
  choiceOf,
  literal,
  recursiveParser,
  sequenceOf,
} from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `TextReal ::= "INF" | "-" & "INF" | "NaN"`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        literal(ProductionType.INF),
        sequenceOf(ProductionType.TextReal, [
          literal(ProductionType.hyphen),
          literal(ProductionType.INF),
        ]),
        literal(ProductionType.NaN),
      ],
      ProductionType.TextReal
    )
);
