import { choiceOf, literal, recursiveParser } from '../generic/index.js';
import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';

/**
 * `UsefulObjectClassReference ::= TYPE-IDENTIFIER | ABSTRACT-SYNTAX`
 */
export default recursiveParser(
  (): Parser =>
    choiceOf(
      [
        literal(ProductionType._TYPE_IDENTIFIER),
        literal(ProductionType._ABSTRACT_SYNTAX),
      ],
      ProductionType.UsefulObjectClassReference
    )
);
