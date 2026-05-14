import { choiceOf, literal, optional, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

/**
 * `Class ::= UNIVERSAL | APPLICATION | PRIVATE | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      choiceOf(
        [
          literal(ProductionType._UNIVERSAL),
          literal(ProductionType._APPLICATION),
          literal(ProductionType._PRIVATE),
        ],
        ProductionType.Class
      )
    )
);
