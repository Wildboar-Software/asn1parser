import { choiceOf, literal, recursiveParser } from '../generic/index.mjs';
import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';

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
