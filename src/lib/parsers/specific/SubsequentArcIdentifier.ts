import type Parser from '../../Parser.js';
import ProductionType from '../../ProductionType.js';
import literal from '../generic/literal.js';
import repeatable from '../generic/repeatable.js';
import ArcIdentifier from './ArcIdentifier.js';
import sequenceOf from '../generic/sequenceOf.js';
import whitespace from '../generic/whitespace.js';
import optional from '../generic/optional.js';
import recursiveParser from '../generic/recursiveParser.js';

/**
 * `SubsequentArcIdentifier ::= "/" ArcIdentifier SubsequentArcIdentifier | empty`
 */
export default recursiveParser(
  (): Parser =>
    repeatable(
      ProductionType.SubsequentArcIdentifier,
      sequenceOf(ProductionType.SubsequentArcIdentifier, [
        literal(ProductionType.forwardSlash),
        optional(whitespace),
        ArcIdentifier,
        optional(whitespace),
      ])
    )
);
