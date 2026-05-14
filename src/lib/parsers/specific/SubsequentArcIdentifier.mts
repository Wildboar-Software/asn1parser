import type Parser from '../../Parser.mjs';
import ProductionType from '../../ProductionType.mjs';
import literal from '../generic/literal.mjs';
import repeatable from '../generic/repeatable.mjs';
import ArcIdentifier from './ArcIdentifier.mjs';
import sequenceOf from '../generic/sequenceOf.mjs';
import whitespace from '../generic/whitespace.mjs';
import optional from '../generic/optional.mjs';
import recursiveParser from '../generic/recursiveParser.mjs';

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
