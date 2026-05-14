import {
  choiceOf,
  literal,
  recursiveParser,
  sequenceOf,
} from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
