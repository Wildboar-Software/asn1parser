import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `SpecialRealValue ::= PLUS-INFINITY | MINUS-INFINITY | NOT-A-NUMBER`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        literal(ProductionType._PLUS_INFINITY),
        literal(ProductionType._MINUS_INFINITY),
        literal(ProductionType._NOT_A_NUMBER),
      ],
      ProductionType.SpecialRealValue
    )
);
