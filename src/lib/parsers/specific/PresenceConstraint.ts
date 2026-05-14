import { choiceOf, literal, optional, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `PresenceConstraint ::= PRESENT | ABSENT | OPTIONAL | empty`
 */
export default recursiveParser(
  (): Parser =>
    optional(
      choiceOf(
        [
          literal(ProductionType._PRESENT),
          literal(ProductionType._ABSENT),
          literal(ProductionType._OPTIONAL),
        ],
        ProductionType.PresenceConstraint
      )
    )
);
