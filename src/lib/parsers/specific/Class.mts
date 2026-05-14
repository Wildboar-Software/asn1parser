import { choiceOf, literal, optional, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

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
