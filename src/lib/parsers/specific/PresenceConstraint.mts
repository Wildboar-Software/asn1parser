import { choiceOf, literal, optional, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
