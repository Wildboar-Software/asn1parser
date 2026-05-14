import { choiceOf, literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
